const checkName = (name) =>{
    if(name.length < 20){
        console.log('Halo,',name)
        return
    }
    if(name.length >= 20){
        console.log('Panjang umur yang mulia',name)
        return
    }

    console.log('Maaf, saya tidak bisa mengeja namanya')
}

checkName("John Due")
checkName("Sri Sultan Hamengkubuwono I")
checkName(10)
checkName(true)