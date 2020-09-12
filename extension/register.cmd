@echo off

call :isAdmin
if %errorlevel% == 0 (
    goto :run
) else (
    echo Error: Run as administrator.
)
exit /b

:isAdmin
fsutil dirty query %systemdrive% >nul
exit /b

:run
reg add HKLM\SOFTWARE\Google\Chrome\NativeMessagingHosts\io.lit3d.kinect /f /ve /t REG_SZ /d %~dp0io.lit3d.kinect-win.json
pause