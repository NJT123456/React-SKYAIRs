*** Settings ***
Library         SeleniumLibrary
Resource        ../keywords.resource
Test Setup      Go To    http://localhost:3000/

*** Test Cases ***
TC_FLIGHT_ROUNDTRIP_001
    Click Link    id=link-homepage-logo
    Wait Until Location Is    http://localhost:3000/
    Click Link    id=home
    Wait Until Location Is    http://localhost:3000/
    FLIGHT SEARCH    roundTrip    switch=    godate=//*[@id="button-go-select-date"]/div[2]/div/div[2]/div/div[1]/button[6]
    Alert Should Be Present    There is no information on the return flight.    ACCEPT

TC_FLIGHT_ROUNDTRIP_002
    Click Link    id=link-homepage-logo
    Wait Until Location Is    http://localhost:3000/
    Click Link    id=home
    Wait Until Location Is    http://localhost:3000/
    FLIGHT SEARCH    roundTrip    switch=    godate=//*[@id="button-go-select-date"]/div[2]/div/div[2]/div/div[1]/button[5]
    Wait Until Page Contains    เที่ยวบินขาออก
    Click Button    id=submit-0
    Wait Until Page Contains    เที่ยวบินขากลับ

TC_FLIGHT_ROUNDTRIP_003
    Click Link    เที่ยวบิน
    Wait Until Location Is    http://localhost:3000/flight
    Click Button    id=changeFlight
    Sleep    1s
    FLIGHT SEARCH    roundTrip    switch=    godate=//*[@id="button-go-select-date"]/div[2]/div/div[2]/div/div[1]/button[6]
    Alert Should Be Present    There is no information on the return flight.    ACCEPT

TC_FLIGHT_ROUNDTRIP_004
    Click Link    เที่ยวบิน
    Wait Until Location Is    http://localhost:3000/flight
    Click Button    id=changeFlight
    Sleep    1s
    FLIGHT SEARCH    roundTrip    switch=    godate=//*[@id="button-go-select-date"]/div[2]/div/div[2]/div/div[1]/button[5]
    Wait Until Page Contains    เที่ยวบินขาออก
    Click Button    id=submit-0
    Wait Until Page Contains    เที่ยวบินขากลับ

TC_FLIGHT_ROUNDTRIP_005
    Click Link    เที่ยวบิน
    Wait Until Location Is    http://localhost:3000/flight
    Click Button    id=changeFlight
    Sleep    1s
    FLIGHT SEARCH    roundTrip    switch=    godate=//*[@id="button-go-select-date"]/div[2]/div/div[2]/div/div[1]/button[5]
    Wait Until Page Contains    เที่ยวบินขาออก
    Click Button    id=submit-0
    Wait Until Page Contains    เที่ยวบินขากลับ
    Click Button    id=submit-1
    Sleep    1s
    Click Button    id=logout
    Wait Until Page Contains    เข้าสู่ระบบ

TC_FLIGHT_ROUNDTRIP_006
    Flight search roundTrip success
    Click Button    id=confirmFlight
    Sleep    1s
    Wait Until Page Contains    Login

TC_FLIGHT_ROUNDTRIP_007
    LOGIN SUCCESS
    Sleep    1s
    Flight search roundTrip success
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ROUNDTRIP_008
    Flight search roundTrip success
    Input Text    name=fn    nam
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ROUNDTRIP_009
    Flight search roundTrip success
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ROUNDTRIP_010
    Flight search roundTrip success
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ROUNDTRIP_011
    Flight search roundTrip success
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    aaaaaaaa
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบทุกช่อง    ACCEPT

TC_FLIGHT_ROUNDTRIP_012
    Flight search roundTrip success
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    aaaaaaaa
    Input Text    name=tel    0988888
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    กรุณากรอกที่อยู่อีเมลที่ถูกต้อง    ACCEPT

TC_FLIGHT_ROUNDTRIP_013
    Flight search roundTrip success
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    abc@mail.com
    Input Text    name=tel    0988888
    Click Button    id=confirmFlight
    Sleep    1s
    Alert Should Be Present    กรุณากรอกเบอร์โทรให้ครบ    ACCEPT

TC_FLIGHT_ROUNDTRIP_014
    Flight search roundTrip success
    Input Text    name=fn    nam
    Input Text    name=ln    ln
    Click Element    id=gender
    Click Element    id=MALE
    Input Text    name=email    abc@mail.com
    Input Text    name=tel    0988888999
    Click Button    id=confirmFlight
    Sleep    1s
    Wait Until Page Contains    Congratulations, Your Flight are booking confirmed.

TC_FLIGHT_ROUNDTRIP_015
    Flight search roundTrip success
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

TC_FLIGHT_ROUNDTRIP_016
    Flight search roundTrip success
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