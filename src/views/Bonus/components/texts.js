export default {
  modal: 'Поздравляю тебя с прохождением всех заданий! Теперь тебе доступно бонусное упражнение. Мы снова поработаем с корректировкой прогноза погоды. На этот раз закономерности станут сложнее, и их будет больше!',
  modalFinish: 'Прекрасная работа. Тебе покорились все бонусные уровни! А теперь возвращайся на платформу, чтобы забрать свой заслуженный сертификат.',
  start: ['Посмотри на прогнозы температуры, ветра и других параметров на несколько дней.'],
  stage2: {
    start: ['Теперь посмотри на фактическую температуру и выбери те дни, когда прогноз ошибся.'],
    error: {
      part1: 'Посмотри внимательно на температуру! Сравни фактическую и прогнозируемую.',
      part2: 'Посмотри внимательно на температуру! Сравни фактическую и прогнозируемую.',
      part3: 'Посмотри внимательно на температуру! Сравни фактическую и прогнозируемую.',
      part4: 'Посмотри внимательно на температуру! Сравни фактическую и прогнозируемую.',
      part5: 'Посмотри внимательно на температуру! Сравни фактическую и прогнозируемую.',
    },
    final: 'Отлично, мы нашли неверные прогнозы. Попробуй понять, что общего в днях с неверным прогнозом.',
  },
  stage4: {
    start: 'Найди закономерность в ошибках и выбери верное утверждение.',
    error: {
      part1: 'Обрати внимание на направление ветра.',
      part2: 'Обрати внимание на направление ветра в дни с ошибкой.',
      part3: 'Обрати внимание на направление ветра и наличие осадков в дни с ошибочным прогнозом.',
      part4: 'Обрати внимание на направление ветра и наличие осадков в дни с ошибочным прогнозом.',
      part5: 'Обрати внимание на направление ветра, наличие осадков и температуру в дни с ошибочным прогнозом.',
    },
    final: 'Да! Верная закономерность.',
  },
  stage6: {
    start: ['Теперь посмотри на новые прогнозы и, использую найденные закономерности в ошибках прогноза температуры, выбери те строки , которые требуют корректировки'],
    error: {
      part1: 'Вспомни найденную закономерность. Обрати внимание на направление ветра!',
      part2: 'Вспомни найденную закономерность. Обрати внимание на направление ветра!',
      part3: 'Вспомни найденную закономерность. Обрати внимание на направление ветра и наличие дождя!',
      part4: 'Вспомни найденную закономерность. Обрати внимание на направление ветра и наличие дождя!',
      part5: 'Вспомни найденную закономерность. Обрати внимание на направление ветра, наличие дождя и температуру!',
    },
    final: 'Здорово! У тебя получилось! Искусственный интеллект делает примерно то же самое. Находит закономерности в ошибках прогноза и на их основании корректирует новый прогноз!',
  },
  patterns: {
    part1: ['Прогноз температуры ошибается в дни с восточным ветром', 'Прогноз температуры ошибается в дни с западным ветром', 'Прогноз температуры ошибается в дни с южным ветром', 'Прогноз температуры ошибается в дни с северным ветром'],
    part2: ['Прогноз температуры ошибается в дни с южным ветром или восточным ветром', 'Прогноз температуры ошибается в дни с любым ветром, кроме северного', 'Прогноз температуры ошибается в дни с северным ветром или западным ветром', 'Прогноз температуры ошибается в дни с южным или западным ветром'],
    part3: ['Прогноз температуры ошибается в дождливые дни или дни с западным ветром', 'Прогноз температуры ошибается в дождливые дни с любым ветром', 'Прогноз температуры ошибается в солнечные дни с южным ветром или дождливые дни с прогнозом холодной погоды', 'Прогноз температуры ошибается в солнечные дни или дни с восточным ветром'],
    part4: ['Прогноз температуры ошибается в дождливые дни с северным ветром или в солнечные дни с южным ветром', 'Прогноз температуры ошибается в солнечные дни с южным или восточным ветром или в дождливые дни с северным ветром', 'Прогноз температуры ошибается в солнечные дни с восточным ветром или в дождливые дни с западным ветром', 'Прогноз температуры ошибается только в солнечные дни с любым ветром'],
    part5: ['Прогноз температуры ошибается в любые дни с южным ветром', 'Прогноз температуры ошибается в солнечные дни с южным ветром и прогнозом теплой погоды или в любые дождливые дни', 'Прогноз температуры ошибается в солнечные дни с южным ветром или в дождливые дни с прогнозом холодной погоды', 'Прогноз температуры ошибается только в дождливые дни с любым ветром'],
  },
}