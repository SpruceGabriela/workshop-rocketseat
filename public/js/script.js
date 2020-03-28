function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hide-scroll")

    document 
        .querySelector("#modal")
        .classList
        .toggle("add-scroll")
}