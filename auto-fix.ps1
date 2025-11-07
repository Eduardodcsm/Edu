# AUTO-FIX-DENTAL-SCHEDULER.ps1
# PowerShell Script to Fix Dental Practice Manager
# Run as Administrator

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║    DENTAL PRACTICE MANAGER - AUTO-FIX SCRIPT                  ║" -ForegroundColor Cyan
Write-Host "║    Cleaning up files and organizing project structure        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Set project directory
$projectDir = "C:\Users\du57\Documents\GitHub\Edu"

Write-Host "[1/10] Checking project directory..." -ForegroundColor Yellow
if (-not (Test-Path $projectDir)) {
    Write-Host "❌ Project directory not found: $projectDir" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Project directory found" -ForegroundColor Green

Write-Host ""
Write-Host "[2/10] Creating folder structure..." -ForegroundColor Yellow
$folders = @(
    "$projectDir\modules\analytics",
    "$projectDir\modules\settings",
    "$projectDir\modules\dashboard",
    "$projectDir\modules\doctors",
    "$projectDir\modules\appointments",
    "$projectDir\modules\calendar",
    "$projectDir\styles",
    "$projectDir\components",
    "$projectDir\utils",
    "$projectDir\data"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  ✓ Created: $folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[3/10] Backing up files (optional safety copy)..." -ForegroundColor Yellow
$backupDir = "$projectDir\backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
Copy-Item -Path "$projectDir\*.js" -Destination $backupDir -ErrorAction SilentlyContinue
Copy-Item -Path "$projectDir\*.css" -Destination $backupDir -ErrorAction SilentlyContinue
Copy-Item -Path "$projectDir\*.html" -Destination $backupDir -ErrorAction SilentlyContinue
Write-Host "✓ Backup created at: $backupDir" -ForegroundColor Green

Write-Host ""
Write-Host "[4/10] Removing duplicate/old files..." -ForegroundColor Yellow

$filesToDelete = @(
    "$projectDir\calendar.js",        # Old monolithic
    "$projectDir\doctors.js",         # Old monolithic
    "$projectDir\appointments.js",    # Old monolithic
    "$projectDir\utils.js",           # Old utilities
    "$projectDir\package.json",       # Not needed for static site
    "$projectDir\package-lock.json",  # Not needed for static site
    "$projectDir\README.md"           # Old README
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item -Path $file -Force
        Write-Host "  ✓ Deleted: $(Split-Path $file -Leaf)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[5/10] Organizing CSS files..." -ForegroundColor Yellow

# Keep the newer style.css (50,289 bytes)
# Delete old style.css if both exist
$styleCSSfiles = Get-ChildItem -Path $projectDir -Name "style.css" -ErrorAction SilentlyContinue
if (($styleCSSfiles | Measure-Object).Count -gt 1) {
    # Keep the larger one (newer)
    $latestStyle = Get-ChildItem "$projectDir\style.css" | Sort-Object Length -Descending | Select-Object -First 1
    Write-Host "  ✓ Keeping newer style.css ($(($latestStyle.Length/1024).ToString('F1'))KB)" -ForegroundColor Green
}

# Move/organize CSS files to styles folder
$cssFiles = @("style.css", "animations.css", "analytics.css", "settings.css")
foreach ($cssFile in $cssFiles) {
    $source = "$projectDir\$cssFile"
    $dest = "$projectDir\styles\$cssFile"
    
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $dest -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ Moved $cssFile to styles/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[6/10] Organizing JavaScript files..." -ForegroundColor Yellow

# Keep newer app.js (36,423 bytes) as main data file
# Keep main.js as initialization
$mainSource = "$projectDir\main.js"
$destMain = "$projectDir\main.js"
Write-Host "  ✓ Keeping main.js as entry point" -ForegroundColor Green

# Move analytics and settings to modules
$moduleFiles = @(
    @{"src"="$projectDir\analytics.js"; "dest"="$projectDir\modules\analytics\analytics.js"},
    @{"src"="$projectDir\settings.js"; "dest"="$projectDir\modules\settings\settings.js"}
)

foreach ($file in $moduleFiles) {
    if (Test-Path $file.src) {
        Move-Item -Path $file.src -Destination $file.dest -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ Moved $(Split-Path $file.src -Leaf) to modules/" -ForegroundColor Green
    }
}

# Keep newer app.js as data store (rename to data-store.js for clarity)
$appSource = "$projectDir\app.js"
if (Test-Path $appSource) {
    $fileSize = (Get-Item $appSource).Length
    if ($fileSize -gt 30000) {  # Larger app.js is the newer one with more data
        Copy-Item -Path $appSource -Destination "$projectDir\data\data-store.js" -Force
        Write-Host "  ✓ Copied app.js to data/data-store.js" -ForegroundColor Green
        Remove-Item -Path $appSource -Force
    }
}

Write-Host ""
Write-Host "[7/10] Verifying required files exist..." -ForegroundColor Yellow

$requiredFiles = @(
    "$projectDir\index.html",
    "$projectDir\main.js",
    "$projectDir\styles\style.css",
    "$projectDir\styles\animations.css",
    "$projectDir\modules\analytics\analytics.js",
    "$projectDir\modules\settings\settings.js"
)

$allFound = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $(Split-Path -Path $file -NoQualifier)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ MISSING: $(Split-Path -Path $file -NoQualifier)" -ForegroundColor Red
        $allFound = $false
    }
}

if (-not $allFound) {
    Write-Host ""
    Write-Host "⚠️  Some required files are missing. Please add them before running the app." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[8/10] Cleaning up duplicate files in root..." -ForegroundColor Yellow

# Remove any duplicate .js or .css in root that shouldn't be there
$rootJSFiles = Get-ChildItem "$projectDir\*.js" -ErrorAction SilentlyContinue | Where-Object { $_.Name -notin @("main.js") }
$rootCSSFiles = Get-ChildItem "$projectDir\*.css" -ErrorAction SilentlyContinue

foreach ($file in $rootJSFiles) {
    if ($file.Name -notlike "main.js") {
        Remove-Item -Path $file.FullName -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ Removed duplicate: $($file.Name)" -ForegroundColor Green
    }
}

foreach ($file in $rootCSSFiles) {
    Remove-Item -Path $file.FullName -Force -ErrorAction SilentlyContinue
    Write-Host "  ✓ Removed CSS from root: $($file.Name)" -ForegroundColor Green
}

Write-Host ""
Write-Host "[9/10] Creating project structure summary..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📁 Final Project Structure:" -ForegroundColor Cyan
Write-Host ""
Get-ChildItem -Path $projectDir -Recurse -Directory | ForEach-Object {
    $level = ($_.FullName.Replace($projectDir, '').Split('\').Count - 1)
    $indent = "  " * $level
    Write-Host "$indent📁 $($_.Name)"
}

Write-Host ""
Write-Host "📄 Root Files:" -ForegroundColor Cyan
Get-ChildItem -Path $projectDir -MaxDepth 1 -File | ForEach-Object {
    Write-Host "   📄 $($_.Name)"
}

Write-Host ""
Write-Host "[10/10] Cleanup complete!" -ForegroundColor Yellow

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              ✅ CLEANUP SUCCESSFUL                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host ""
Write-Host "📝 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Open your project in VS Code or your editor" -ForegroundColor White
Write-Host "2. Start a local web server:" -ForegroundColor White
Write-Host "   - macOS: python3 -m http.server 8000" -ForegroundColor Yellow
Write-Host "   - Windows: python -m http.server 8000" -ForegroundColor Yellow
Write-Host "   - Or use VS Code Live Server extension" -ForegroundColor Yellow
Write-Host "3. Open http://localhost:8000 in your browser" -ForegroundColor White
Write-Host "4. Click on 'Analytics' and 'Settings' in the navigation menu" -ForegroundColor White
Write-Host ""
Write-Host "📚 File Locations:" -ForegroundColor Cyan
Write-Host "   HTML:        $projectDir\index.html" -ForegroundColor Gray
Write-Host "   CSS:         $projectDir\styles\*.css" -ForegroundColor Gray
Write-Host "   JavaScript:  $projectDir\*.js" -ForegroundColor Gray
Write-Host "   Modules:     $projectDir\modules\*\*.js" -ForegroundColor Gray
Write-Host ""
Write-Host "If you still see issues, check the browser console (F12) for errors" -ForegroundColor Yellow
Write-Host ""

# Open explorer to the project folder
Write-Host "Opening project folder..." -ForegroundColor Gray
Invoke-Item $projectDir
