# Blur ONLY currency amounts (values next to $) — leave names, counts, labels visible.
Add-Type -AssemblyName System.Drawing

function Pixelate-RegionFast {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [int]$X,
    [int]$Y,
    [int]$W,
    [int]$H,
    [int]$Factor = 14
  )
  $x1 = [Math]::Max(0, $X)
  $y1 = [Math]::Max(0, $Y)
  $w = [Math]::Min($W, $Bitmap.Width - $x1)
  $h = [Math]::Min($H, $Bitmap.Height - $y1)
  if ($w -lt 4 -or $h -lt 4) { return }

  $srcRect = New-Object System.Drawing.Rectangle $x1, $y1, $w, $h
  $smallW = [Math]::Max(1, [int]($w / $Factor))
  $smallH = [Math]::Max(1, [int]($h / $Factor))
  $small = New-Object System.Drawing.Bitmap $smallW, $smallH
  $g1 = [System.Drawing.Graphics]::FromImage($small)
  $g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBilinear
  $g1.DrawImage(
    $Bitmap,
    (New-Object System.Drawing.Rectangle 0, 0, $smallW, $smallH),
    $srcRect,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $g1.Dispose()

  $g2 = [System.Drawing.Graphics]::FromImage($Bitmap)
  $g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
  $g2.DrawImage($small, $srcRect)
  $g2.Dispose()
  $small.Dispose()
}

function Process-Image {
  param([string]$Path, [object[]]$NormRegions, [int]$Factor = 16)
  $full = (Resolve-Path $Path).Path
  $img = [System.Drawing.Image]::FromFile($full)
  $bmp = New-Object System.Drawing.Bitmap $img
  $img.Dispose()
  $w = $bmp.Width
  $h = $bmp.Height
  foreach ($r in $NormRegions) {
    Pixelate-RegionFast -Bitmap $bmp `
      -X ([int]($r[0] * $w)) -Y ([int]($r[1] * $h)) `
      -W ([int]($r[2] * $w)) -H ([int]($r[3] * $h)) `
      -Factor $Factor
  }
  $tmp = "$full.tmp.png"
  $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Move-Item $tmp $full -Force
  Write-Output "blurred `$ amounts on $([IO.Path]::GetFileName($Path))"
}

$dir = Join-Path $PSScriptRoot "..\public\case-studies\flashmed"

$jobs = @{
  "01-admin-home.png" = @(
    @(0.22, 0.48, 0.10, 0.06),
    @(0.40, 0.48, 0.10, 0.06)
  )
  "02-role-home.png" = @(
    @(0.28, 0.18, 0.16, 0.06),
    @(0.48, 0.18, 0.14, 0.06)
  )
  "03-payment-schedule.png" = @(
    @(0.14, 0.18, 0.20, 0.09),
    @(0.40, 0.18, 0.20, 0.09),
    @(0.66, 0.18, 0.20, 0.09),
    @(0.40, 0.34, 0.20, 0.09),
    @(0.66, 0.34, 0.22, 0.09)
  )
  "03-payment-table.png" = @(
    @(0.50, 0.28, 0.09, 0.55),
    @(0.70, 0.28, 0.10, 0.55),
    @(0.88, 0.28, 0.10, 0.55)
  )
}

foreach ($name in $jobs.Keys) {
  $path = Join-Path $dir $name
  if (Test-Path $path) {
    Process-Image -Path $path -NormRegions $jobs[$name]
  }
}

Write-Output "unblurred (no `$): 04-job-sheet, 07-tasks, 08-ai-report"
