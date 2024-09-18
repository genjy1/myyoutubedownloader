<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold mb-8">YouTube Video Downloader</h1>
    <input
      v-model="url"
      type="text"
      placeholder="Enter YouTube URL"
      class="p-2 border border-gray-300 rounded mb-4 w-1/2"
    />
    <button
      @click="downloadVideo"
      class="bg-blue-500 text-white px-6 py-2 rounded"
    >
      Download Video
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const url = ref(''); // создаем реактивную переменную для URL

    const downloadVideo = () => {
      if (url.value) {
        const link = document.createElement('a');
        link.href = `http://localhost:4000/download?url=${url.value}`;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    return {
      url,
      downloadVideo,
    };
  },
};
</script>

