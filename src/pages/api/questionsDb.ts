import QuestionModel from "../../models/question";
import OptionModel from "../../models/option";

const questions: QuestionModel[] = [
  new QuestionModel(
    306,
    "Quais dos seguintes materiais podem ser reciclados?",
    [
      OptionModel.isWrong("Copos de vidro e lâmpadas"),
      OptionModel.isWrong("Jornais, revistas e papel higiênico"),
      OptionModel.isWrong("Arames, pregos e esponjas de aço"),
      OptionModel.isCorrect("Baldes e embalagens de produtos de limpeza"),
    ]
  ),

  new QuestionModel(202, "Sobre as hidrelétricas é incorreto afirmar:", [
    OptionModel.isWrong(
      "As hidrelétricas causam grande impacto ambiental e social"
    ),
    OptionModel.isWrong("Causa extinção de certas espécies de peixes"),
    OptionModel.isWrong(
      "Os reservatórios de hidrelétricas ajudam a absorver os gases do efeito estufa"
    ),
    OptionModel.isCorrect(
      "Florestas inundadas se decompõe produzindo sulfeto de hidrogênio (H2S)"
    ),
  ]),
  /*
  new QuestionModel(203, 'Qual é o coletivo de cães?', [
    OptionModel.isWrong('Manada'),
    OptionModel.isWrong('Alcateia'),
    OptionModel.isWrong('Rebanho'),
    OptionModel.isCorrect('Matilha'),
  ]),
  new QuestionModel(206, 'Qual é o antônimo de "malograr"?', [
    OptionModel.isWrong('Perder'),
    OptionModel.isWrong('Fracassar'),
    OptionModel.isWrong('Desprezar'),
    OptionModel.isCorrect('Conseguir'),
  ]),

  new QuestionModel(
    209,
    'Seguindo a sequência do baralho, qual carta vem depois do dez?',
    [
      OptionModel.isWrong('Ás'),
      OptionModel.isWrong('Nove'),
      OptionModel.isWrong('Rei'),
      OptionModel.isCorrect('Valete'),
    ]
  ),
*/
  new QuestionModel(
    204,
    "Quais dessas atividades cotidianas desperdiça mais água?",
    [
      OptionModel.isWrong("Tomar banhos longos"),
      OptionModel.isWrong("Abrir a torneira enquanto lava a louça"),
      OptionModel.isWrong("Usar uma máquina de lavar"),
      OptionModel.isCorrect("Deixar um vaso sanitário vazando"),
    ]
  ),

  new QuestionModel(205, "O que são as águas cinzas?", [
    OptionModel.isWrong(
      "Águas provenientes da cozinha, devido à alta concentração de matéria orgânica"
    ),
    OptionModel.isWrong("Águas que podem ser reaproveitadas de forma potável"),
    OptionModel.isWrong(
      "Água residual industrial que pode ser reaproveitada para usos não potáveis"
    ),
    OptionModel.isCorrect(
      "Água residual originada de processos domésticos como lavar louça"
    ),
  ]),

  new QuestionModel(
    208,
    "Qual das seguintes opções não representa uma vantagem da biomassa?",
    [
      OptionModel.isWrong("Fonte inesgotável de matéria prima"),
      OptionModel.isWrong("Custo baixo de operação"),
      OptionModel.isWrong("Reaproveitamento de resíduos orgânicos"),
      OptionModel.isCorrect("Não agride o solo"),
    ]
  ),

  new QuestionModel(210, "Quais são os 4 R´s da sustentabilidade?", [
    OptionModel.isWrong("Reduzir, Reutilizar, Reciclar e Respeitar"),
    OptionModel.isWrong("Reduzir, Reutilizar, Reciclar e Realizar"),
    OptionModel.isWrong("Refletir, Reduzir, Reutilizar e Reciclar"),
    OptionModel.isCorrect("Repensar, Reduzir, Reutilizar e Reciclar"),
  ]),

  new QuestionModel(
    211,
    "Qual a porcentagem de água do planeta que é doce e pode ser usada para consumo humano?",
    [
      OptionModel.isWrong("0.5%"),
      OptionModel.isWrong("5%"),
      OptionModel.isWrong("10%"),
      OptionModel.isCorrect("1%"),
    ]
  ),

  new QuestionModel(
    212,
    "Qual das seguintes afirmações é um mito sobre a energia solar?",
    [
      OptionModel.isWrong("Pode ser gerada mesmo em dias nublados"),
      OptionModel.isWrong(
        "Pode ser aproveitada por meio de painéis fotovoltaicos e usinas heliotérmicas"
      ),
      OptionModel.isWrong(
        "Preço elevado em relação às demais fontes de energia"
      ),
      OptionModel.isCorrect(
        "É necessária a instalação de baterias para armazenar a energia gerada"
      ),
    ]
  ),

  new QuestionModel(
    213,
    "Qual é o melhor período do dia para regar o gramado?",
    [
      OptionModel.isWrong("Ao Meio dia"),
      OptionModel.isWrong("Pelo meio da tarde"),
      OptionModel.isWrong("Qualquer horário"),
      OptionModel.isCorrect("Pela manhã"),
    ]
  ),

  new QuestionModel(214, "A Madeira é um material reciclável?", [
    OptionModel.isWrong("Sim, e deve ser descartado no ecoponto verde (vidro)"),
    OptionModel.isWrong(
      "Sim, e deve ser descartado no ecoponto azul (papel e cartão)"
    ),
    OptionModel.isWrong("Não e deve ser descartado de maneira diferente"),
    OptionModel.isCorrect(
      "Sim, e deve ser descartado no ecoponto amarelo (plástico e metal)"
    ),
  ]),

  new QuestionModel(
    215,
    "Quais das seguintes alternativas é constituída apenas por fontes de energia renováveis?",
    [
      OptionModel.isWrong("Solar, gás natural e biomassa"),
      OptionModel.isWrong("Carvão mineral, solar e eólica"),
      OptionModel.isWrong("Eólica, energia das marés e xisto betuminoso"),
      OptionModel.isCorrect("Biomassa, hidroelétrica e geotérmica"),
    ]
  ),

  new QuestionModel(
    216,
    "Qual dos seguintes cuidados a se ter ao descartar material reciclável é falso?",
    [
      OptionModel.isWrong("Embalar bem vidros quebrados e objetos cortantes"),
      OptionModel.isWrong("Usar sacos resistentes para evitar que se rompam"),
      OptionModel.isWrong("Cortar o papelão e colocar em sacos bem vedados"),
      OptionModel.isCorrect(
        "Lavar as embalagens de plástico, vidro e alumínio"
      ),
    ]
  ),
];

export default questions;
