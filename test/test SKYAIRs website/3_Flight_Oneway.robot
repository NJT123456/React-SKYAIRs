*** Settings ***
Library         SeleniumLibrary
Resource        ../keywords.resource

Test Setup      Go To    http://localhost:3000/

*** Test Cases ***
TC_FLIGHT_ONEWAY_001
    Click Link    id=link-homepage-logo
    Wait Until Location Is    http://localhost:3000/
    Click Link    id=home
    Wait Until Location Is    http://localhost:3000/
    FLIGHT SEARCH    OneWay    switch-button
    Alert Should Be Present    There is no information on the departure flight.    ACCEPT

TC_FLIGHT_ONEWAY_002
    Click Link    id=link-homepage-logo
    Wait Until Location Is    http://localhost:3000/
    Click Link    id=home
    Wait Until Location Is    http://localhost:3000/
    FLIGHT SEARCH    OneWay    switch=
    Wait Until Page Contains    เที่ยวบินขาออก

TC_FLIGHT_ONEWAY_003
    Click Link    เที่ยวบิน
    Wait Until Location Is    http://localhost:3000/flight
    Click Button    id=changeFlight
    Sleep    1s
    FLIGHT SEARCH    OneWay    switch-button
    Alert Should Be Present    There is no information on the departure flight.    ACCEPT

TC_FLIGHT_ONEWAY_004
    Flight search oneway success

TC_FLIGHT_ONEWAY_005
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001

TC_FLIGHT_ONEWAY_006
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Click Button    id=confirmFlight
    Sleep    1s
    Wait Until Page Contains    Login

TC_FLIGHT_ONEWAY_007
    LOGIN SUCCESS
    Sleep    1s
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ONEWAY_008
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ONEWAY_009
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ONEWAY_010
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ONEWAY_011
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    aaaaaaaa
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ONEWAY_012
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    aaaaaaaa
    Input Text    name=tel    0988888
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    กรุณากรอกที่อยู่อีเมลที่ถูกต้อง    ACCEPT

TC_FLIGHT_ONEWAY_013
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    abc@mail.com
    Input Text    name=tel    0988888
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    กรุณากรอกเบอร์โทรให้ครบ    ACCEPT

TC_FLIGHT_ONEWAY_014
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    abc@mail.com
    Input Text    name=tel    0988888999
    Click Button    id=confirmFlight
    Sleep    1s
    Wait Until Page Contains    Congratulations, Your Flight are booking confirmed.

TC_FLIGHT_ONEWAY_015
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    abc@mail.com
    Input Text    name=tel    0988888999
    Click Button    id=confirmFlight
    Sleep    1s
    Wait Until Page Contains    Congratulations, Your Flight are booking confirmed.
    Click Button    id=close-confirm
    Wait Until Page Does Not Contain    Congratulations, Your Flight are booking confirmed.

TC_FLIGHT_ONEWAY_016
    Flight search oneway success
    Click Button    id=submit-0
    Wait Until Location Is    http://localhost:3000/flight/confirm
    Wait Until Page Contains    TF001
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    abc@mail.com
    Input Text    name=tel    0988888999
    Click Button    id=confirmFlight
    Sleep    1s
    Wait Until Page Contains    Congratulations, Your Flight are booking confirmed.
    Click Element    id=link-to-order
    Wait Until Location Is    http://localhost:3000/flight/order
    Wait Until Page Contains    สถานะการจอง