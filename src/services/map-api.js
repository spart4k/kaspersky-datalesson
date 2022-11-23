import ymaps from 'ymaps'

let mapsApi = null

export default async () => {
  if (mapsApi) return mapsApi

  const { VUE_APP_YANDEX_KEY } = process.env

  const maps = await ymaps
    .load(VUE_APP_YANDEX_KEY ? `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${VUE_APP_YANDEX_KEY}&load=package.full` : undefined)

  mapsApi = maps

  return maps
}
