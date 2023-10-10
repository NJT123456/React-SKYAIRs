*** Settings ***
Library    SeleniumLibrary
Resource    ../keywords.resource
Test Setup    Go To    http://localhost:3000/

*** Test Cases ***
TC_REGISTRATION_001
    Register    nam    123    123    Username already exists

TC_REGISTRATION_002
    Register    nam    123    1234    Username already exists

TC_REGISTRATION_003
    Register    admin    123    123     showerror=   

TC_REGISTRATION_004
    Register    namin    123    1234    Passwords do not match
