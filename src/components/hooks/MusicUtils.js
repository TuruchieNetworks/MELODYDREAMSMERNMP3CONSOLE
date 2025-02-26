class MusicUtils {
  constructor() {
    this.baseUrl = "https://your-bucket.s3.amazonaws.com/"; // Replace with your actual S3 bucket URL
    this.musicList = this.getMusicList();
    this.musicTracks = this.getCategorizedMusicList();
  }

  getMusicList() {
    return [
      // Static Track
      {
        title: "Never Change",
        originalTrackName: "NeverChange.mp3",
        img: "NeverChange.jpg",
        name: "Never Change",
        artist: "Animate",
        genre: "Music",
        music: "media/NeverChange.mp3", // Static file path
        file: "media/NeverChange.mp3", // Static file path
      },
      {
        title: "Moody Choir Sanctuary",
        originalTrackName: "music/MOODY_CHOIR_SANCTUARY.mp3",
        img: "NeverChange.jpg",
        name: "Moody Choir Sanctuary",
        artist: "Animate",
        genre: "Music",
        music: "music/MOODY_CHOIR_SANCTUARY.mp3", // Static file path
        file: "music/MOODY_CHOIR_SANCTUARY.mp3", // Static file path
      },
      // S3 Hosted Tracks
      //...this.getDynamicS3Tracks(["SkyHigh.mp3", "OceanWaves.mp3"], "Electronic"), // Example tracks
    ];
  }

  getVideoList() {
    return [
      // Static Track
      {
        title: "logo_scene",
        originalTrackName: "logo_scene.mp4",
        name: "logo_scene",
        artist: "Ecool",
        genre: "Music",
        video: "videos/logo_scene.mp4", // Static file path
        file: "videos/logo_scene.mp4", // Static file path
      },
      // S3 Hosted Videos
      //...this.getDynamicS3Tracks(["SkyHigh.mp3", "OceanWaves.mp3"], "Electronic"), // Example tracks
    ];
  }

  getDynamicS3Tracks(fileNames, genre) {
    return fileNames.map((file) => ({
      title: file.replace(".mp3", ""), // Extract title
      originalTrackName: file,
      artist: "Various Artists", // Default artist (adjust dynamically if needed)
      genre: genre,
      file: `${this.baseUrl}${file}`, // Construct S3 URL
    }));
  }

  getCategorizedMusicList() {
    return this.musicList.reduce((categorized, track) => {
      if (!categorized[track.genre]) {
        categorized[track.genre] = [];
      }
      categorized[track.genre].push(track);
      return categorized;
    }, {});
  }

  getTrackByGenre(genre) {
    return this.musicTracks[genre] || [];
  }
}

export default MusicUtils;