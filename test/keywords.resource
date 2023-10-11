*** Settings ***
Library     SeleniumLibrary


*** Keywords ***
# Register a user on a website
Register
    [Arguments]    ${username}    ${password}    ${confirmPassword}    ${showerror}
    Click Button    id=link-registration
    Input Text    name=username    ${username}
    Input Password    name=password    ${password}
    Input Password    name=password1    ${confirmPassword}
    Click Button    id=submit
    IF    '${showerror}' != ''
        Wait Until Page Contains    ${showerror}
        Click Link    id=go-login
        Wait Until Page Contains    Login
    ELSE
        Wait Until Element Is Visible    xpath=/html/body/div[1]/nav/div/div[2]/div
    END

# *Login

Login
    [Arguments]    ${username}    ${pwd}    ${showerror}
    Click Button    id=link-login
    Input Text    name=username    ${username}
    Input Password    name=password    ${pwd}
    Click Button    id=submit
    IF    "${showerror}" == "User Doesn't Exist"
        Wait Until Page Contains    ${showerror}
        Click Link    id=registration
        Wait Until Page Contains    Register
    ELSE IF    '${showerror}' == 'Wrong Username And Password Combination'
        Wait Until Page Contains    ${showerror}
    ELSE
        Wait Until Element Is Visible    id=form-validation
    END

LOGIN SUCCESS
    Login    nam    123    showerror=
    Wait Until Page Contains    nam
    Sleep    2s

# *Flight search
FLIGHT SEARCH
    [Arguments]    ${type}    ${switch}    ${godate}
    Click Button    id=${type}
    Click Element    id=from-flight
    Click Element    id=BKK
    Click Element    id=go-flight
    Click Element    id=KBV
    Click Element    id=button-from-date
    Click Button    xpath=//*[@id="button-from-select-date"]/div[1]/div[2]/button[1]
    Click Button    xpath=//*[@id="button-from-select-date"]/div[2]/div/div[2]/div/div[5]/button[7]
    IF    '${type}' == 'roundTrip'
        Sleep    1s
        Click Element    id=button-go-date
        Click Button    xpath=${godate}
    END
    IF    '${switch}' == 'switch-button'    Click Button    id=${switch}
    Click Element    id=seat-flight
    Click Element    id=Economy
    Click Element    id=search

Flight search oneway success
    Click Link    เที่ยวบิน
    Wait Until Location Is    http://localhost:3000/flight
    Click Button    id=changeFlight
    Sleep    1s
    FLIGHT SEARCH    OneWay    switch=    godate=
    Wait Until Page Contains    เที่ยวบินขาออก

Flight search roundTrip success
    FLIGHT SEARCH    roundTrip    switch=    godate=//*[@id="button-go-select-date"]/div[2]/div/div[2]/div/div[1]/button[5]
    Wait Until Page Contains    เที่ยวบินขาออก
    Click Button    id=submit-0
    Wait Until Page Contains    เที่ยวบินขากลับ
    Click Button    id=submit-1
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Wait Until Page Contains    TF005
