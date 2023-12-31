const getProfession = (title, text, icon) => ({
  title,
  text,
  icon,
})

export default [
  getProfession('Метеоролог', 'Специалист по погоде, исследователь атмосферных явлений, который наблюдает за природными явлениями, анализирует их и составляет прогнозы погоды. Метеорологу нужно знать географию и физику, а ещё уметь работать с большим количеством данных.', require('./assets/icons/prof1.png')),
  getProfession('Инженер данных', 'Управляет данными и умеет обращаться к ним с помощью языков запроса. Инженеру данных нужно обладать системным мышлением, любить решать нестандартные задачи и владеть инструментами для работы с данными.', require('./assets/icons/prof2.png')),
  getProfession('Аналитик данных', 'Анализирует данные, чтобы найти в них необходимые закономерности для прогнозов или принятия решений. Аналитику данных важно любить исследования, знать математику, а также языки программирования.', require('./assets/icons/prof3.png')),
  getProfession('Специалист по вычислительной математике', 'Работает с математическими моделями – настраивает их и подбирает параметры, проводит эксперименты с моделями. Настраивает вычислительное оборудование, обеспечивает его работоспособность. Специалисту по вычислительной математике важно хорошо знать математику, языки программирования и любить решать нестандартные задачи.', require('./assets/icons/prof4.png')),
  getProfession('Менеджер проекта', 'Отвечает за успешное и своевременное выполнение проекта, планирует задачи и ресурсы. Менеджеру проекта важно уметь работать с людьми, организовывать других, договариваться и быть очень самоорганизованным и дисциплинированным.', require('./assets/icons/prof6.png')),
  getProfession('Специалист по машинному обучению', 'Создаёт и настраивает модели, по которым компьютер учится на получаемых данных. Специалисту по машинному обучению необходимо отлично знать и очень любить математику и языки программирования.', require('./assets/icons/prof5.png')),
]
