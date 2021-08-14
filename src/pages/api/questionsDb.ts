import QuestionModel from "../../models/question";
import OptionModel from "../../models/option";

const questions: QuestionModel[] = [
  new QuestionModel(306, "Qual bicho transmite a Doença de Chagas?", [
    OptionModel.isWrong("Abelha"),
    OptionModel.isWrong("Besouro"),
    OptionModel.isWrong("Pulga"),
    OptionModel.isCorrect("Barbeiro"),
  ]),

  new QuestionModel(
    202,
    'Qual fruto é conhecido no Norte e Nordeste como "Jerimum"?',
    [
      OptionModel.isWrong("Caju"),
      OptionModel.isWrong("Côco"),
      OptionModel.isWrong("Chuchu"),
      OptionModel.isCorrect("Abóbora"),
    ]
  ),

  new QuestionModel(203, "Qual é o coletivo de cães?", [
    OptionModel.isWrong("Manada"),
    OptionModel.isWrong("Alcateia"),
    OptionModel.isWrong("Rebanho"),
    OptionModel.isCorrect("Matilha"),
  ]),

  new QuestionModel(
    204,
    "Qual é o triângulo que tem todos os lados diferentes?",
    [
      OptionModel.isWrong("Equilátero"),
      OptionModel.isWrong("Isóceles"),
      OptionModel.isWrong("Trapézio"),
      OptionModel.isCorrect("Escaleno"),
    ]
  ),

  new QuestionModel(205, "Quem compôs o Hino da Independência?", [
    OptionModel.isWrong("Castro Alves"),
    OptionModel.isWrong("Manuel Bandeira"),
    OptionModel.isWrong("Carlos Gomes"),
    OptionModel.isCorrect("Dom Pedro I"),
  ]),

  new QuestionModel(206, 'Qual é o antônimo de "malograr"?', [
    OptionModel.isWrong("Perder"),
    OptionModel.isWrong("Fracassar"),
    OptionModel.isWrong("Desprezar"),
    OptionModel.isCorrect("Conseguir"),
  ]),

  new QuestionModel(207, "Em que país nasceu Carmen Miranda?", [
    OptionModel.isWrong("Argentina"),
    OptionModel.isWrong("Espanha"),
    OptionModel.isWrong("Brasil"),
    OptionModel.isCorrect("Portugal"),
  ]),

  new QuestionModel(
    208,
    "Qual foi o último Presidente do período da ditadura militar no Brasil?",
    [
      OptionModel.isWrong("Costa e Silva"),
      OptionModel.isWrong("Emílio Médici"),
      OptionModel.isWrong("Ernesto Geisel"),
      OptionModel.isCorrect("João Figueiredo"),
    ]
  ),

  new QuestionModel(
    209,
    "Seguindo a sequência do baralho, qual carta vem depois do dez?",
    [
      OptionModel.isWrong("Ás"),
      OptionModel.isWrong("Nove"),
      OptionModel.isWrong("Rei"),
      OptionModel.isCorrect("Valete"),
    ]
  ),

  new QuestionModel(210, 'O adjetivo "venoso" está relacionado a:', [
    OptionModel.isWrong("Vela"),
    OptionModel.isWrong("Vento"),
    OptionModel.isWrong("Vênia"),
    OptionModel.isCorrect("Veia"),
  ]),

  new QuestionModel(211, "Que nome se dá à purificação por meio da água?", [
    OptionModel.isWrong("Abrupção"),
    OptionModel.isWrong("Abolição"),
    OptionModel.isWrong("Abnegação"),
    OptionModel.isCorrect("Ablução"),
  ]),

  new QuestionModel(
    212,
    "Qual montanha se localiza entre a fronteira do Tibet com o Nepal?",
    [
      OptionModel.isWrong("Monte Branco"),
      OptionModel.isWrong("Monte Fuji"),
      OptionModel.isWrong("Monte Carlo"),
      OptionModel.isCorrect("Monte Everest"),
    ]
  ),

  new QuestionModel(213, "Em que parte do corpo se encontra a epiglote?", [
    OptionModel.isWrong("Estômago"),
    OptionModel.isWrong("Pâncreas"),
    OptionModel.isWrong("Rim"),
    OptionModel.isCorrect("Pescoço"),
  ]),

  new QuestionModel(214, "A compensação por perda é chamada de...", [
    OptionModel.isWrong("Déficit"),
    OptionModel.isWrong("Indexação"),
    OptionModel.isWrong("Indébito"),
    OptionModel.isCorrect("Indenização"),
  ]),

  new QuestionModel(
    215,
    "Que personagem do folclore brasileiro tem uma perna só?",
    [
      OptionModel.isWrong("Cuca"),
      OptionModel.isWrong("Curupira"),
      OptionModel.isWrong("Boitatá"),
      OptionModel.isCorrect("Saci-pererê"),
    ]
  ),

  new QuestionModel(216, 'Quem é o "patrono" do Exército Brasileiro?', [
    OptionModel.isWrong("Marechal Deodoro"),
    OptionModel.isWrong("Barão de Mauá"),
    OptionModel.isWrong("Marquês de Pombal"),
    OptionModel.isCorrect("Duque de Caxias"),
  ]),
];

export default questions;
