import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("REALIZANDO DOWNLOAD DO VIDEO:", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("A duracao do video e maior que 60 segundos")
        }
      })
      .on("end", () => {
        console.log("Download do video finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Nao foi possivel fazer download do video - detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
