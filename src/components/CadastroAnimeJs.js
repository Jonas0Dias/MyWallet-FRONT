import anime from "animejs"


export default function CadastroAnimeJs(){
    return(
        anime({
            targets: '.logo',
            rotateZ:360,
            scale:4
        })
    )
}