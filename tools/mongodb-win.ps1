#Requires -RunAsAdministrator
param ([String] $action="status")

if (Get-Service MongoDB -ErrorAction SilentlyContinue) {
	
}
else {
	Write-Host "MongoDB is not installed or was not found on the PATH" -ForegroundColor Red
	exit(1)
}

if ($action -eq "status") {
	Get-Service MongoDB
}

if ($action -eq "start") {
	Start-Service MongoDB  -PassThru
}

if ($action -eq "stop") {
	Stop-Service MongoDB  -PassThru
}