param ([int] $ui=1, $api=1)

$apiDirectory = '..\api'
$apiVenvExecDir = Join-Path -Path $apiDirectory -ChildPath 'venv'
$uiDirectory = '..\ui'

if ($api -eq 1) {
	Write-Host 'Setting up API (Python)'
	Push-Location $apiDirectory
	$python = python --version
	Write-Host "Python version:" $python
	Write-Host 'creating a vitual environment'
	python -m venv venv
	& $apiVenvExecDir\Scripts\Activate.ps1
	Write-Host 'installing dependencies'
	pip install -U pip
	pip install -r requirements.txt	
}

if ($ui -eq 1) {
	Write-Host 'Setting up UI (JavaScript)'
	$node = node --version
	$npm = npm --version
	Write-Host "Node version:" $python
	Write-Host "npm version:" $python
	Push-Location $PSScriptRoot
	Push-Location $uiDirectory
	Write-Host 'installing dependencies'
	npm install	
}

Write-Host "Done!"


