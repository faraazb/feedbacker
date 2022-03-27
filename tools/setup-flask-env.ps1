$apiDirectory = '..\api'
$apiVenvScriptsDir = Join-Path -Path $apiDirectory -ChildPath 'venv' | Join-Path -ChildPath "Scripts"

$bash = "`nexport FLASK_APP=feedbacker`nexport FLASK_ENV=development"
Add-Content -Path $apiVenvScriptsDir\activate -Value $bash

$cmd = "`nset FLASK_APP=feedbacker`nset FLASK_ENV=development"
Add-Content -Path $apiVenvScriptsDir\activate.bat -Value $cmd

$pwsh = "`n`$env:FLASK_APP = `"feedbacker`"`n`$env:FLASK_ENV = `"development`""
Add-Content -Path $apiVenvScriptsDir\Activate.ps1 -Value $pwsh
