*** Settings ***
Library    SeleniumLibrary
Resource    ../keywords.resource
Test Setup    Go To    http://localhost:3000/

*** Test Cases ***
TC_LOGIN_001
    LOGIN SUCCESS
    Click Button    id=logout
    Wait Until Page Contains    เข้าสู่ระบบ
    
TC_LOGIN_002
    Login    nam    1234    Wrong Username And Password Combination
    Sleep    2s

TC_LOGIN_003
    Login    min    123    User Doesn't Exist
    Sleep    2s

TC_LOGIN_004
    Login    min    1234    User Doesn't Exist
    Sleep    2s

TC_LOGIN_005
    LOGIN SUCCESS
    Click Button    id=logout
    Wait Until Page Contains    เข้าสู่ระบบ