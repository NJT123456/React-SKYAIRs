*** Settings ***
Library     SeleniumLibrary
Library     OperatingSystem
Resource    ../keywords.resource
# Test Setup    Go To    http://localhost:3000/


*** Test Cases ***
TC_FLIGHT_ORDER_001
    Click Link    คำสั่งซื้อ
    Sleep    5s
    Click Element    id=Cancel-5
    Wait Until Page Contains    สถานะการจอง : Cancelled

TC_FLIGHT_ORDER_002
    Click Link    คำสั่งซื้อ
    Sleep    5s
    Click Element    id=e - Ticket-4
    Sleep    5s
    File Should Exist    C://Users//USER//Downloads//order_RP1004.pdf
