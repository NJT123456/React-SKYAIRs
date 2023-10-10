*** Settings ***
Library    SeleniumLibrary
Suite Setup    Open Browser    http://localhost:3000/    chrome
Suite Teardown    Close All Browsers