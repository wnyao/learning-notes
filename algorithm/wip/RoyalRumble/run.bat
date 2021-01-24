@echo off
for %%f in (input*.txt) do (
  java -cp . Main %%f
  echo.
)