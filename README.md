<div align="center">
  <img src=".public/../public/Logo.svg" />
  <h4>:brazil: Quiz web application with an ecological and sustainability theme.</h4>
  <h3>
    <a href="https://green-quiz.vercel.app/" target="_blank">♻ Green Quiz</a> <br>
  </h3>
  <p align="center">
    <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=70df7c&labelColor=6c54d8" alt="License" />
    <img src="https://img.shields.io/github/forks/capelaum/GreenQuiz?label=forks&message=MIT&color=70df7c&labelColor=6c54d8" alt="Forks">
    <img src="https://img.shields.io/github/stars/capelaum/GreenQuiz?label=stars&message=MIT&color=70df7c&labelColor=6c54d8" alt="Stars">
  </p>

  <img src=".github/cover.png" alt="Green Quiz cover"/>
</div>

#### :brazil: Language: (pt_br) brazilian portuguese

## 💻 Project

This project user the google social login and it's main objective is to test your knowledge of sustainability using a quiz, with 4 asnwer options per question. After finishing the quiz, it saves your score and result stats in a ranking.

## Running locally

### Firebase configuration

Create your firebase app in [Firebase][firebase], then set the `.env.local` file with the needed variables as defined in `.env.example`

## Installation

In the project root, install the dependencies with `yarn` or `npm install`:

```bash
yarn
# or with npm
npm i
```

Run in dev mode in https://localhost:3000

```bash
yarn dev
```

## Features

- Random questions order
- Random options order
- Timer
- Ranking

## 🔖 Layout

You can access the layout prototype through this [link][figma_layout].

You got to have a [Figma account](figma) to see the layout prototype.

## Technologies

- [NextJS][next]
- [Typescript][typescript]
- [Firebase][firebase]
- [Nookies][nookies]
- [Sass][sass]
- [NProgress bar][nprogress]
- [React Toastify][toastify]
- [React Loader Spinner][react_loader]
- [React Countdown Circle Timer][react_timer]

## :memo: Licence

This project is under the MIT license. See the file [LICENSE](.github/LICENSE) for more details.

[sass]: https://sass-lang.com
[next]: https://nextjs.org/docs
[firebase]: https://firebase.google.com
[typescript]: https://www.typescriptlang.org
[nookies]: https://www.npmjs.com/package/nookies
[react_timer]: https://www.npmjs.com/package/react-countdown-circle-timer
[react_loader]: https://www.npmjs.com/package/react-loader-spinner
[nprogress]: https://www.npmjs.com/package/nprogress
[toastify]: https://www.npmjs.com/package/react-toastify
[figma_layout]: https://www.figma.com/file/3C9xWVoZws4U0d3qu4jhGb/GreenQuiz
[figma]: https://figma.com
