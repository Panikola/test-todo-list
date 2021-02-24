<template lang="pug">
  div.task(
    :style="{ background: statusColor }"
    @click="onDoubleClick"
  )
    div.title {{ title }}
    div.description {{ description }}
</template>

<script>
import statuses from "@/constants/statuses";

export default {
  name: "TaskPreview",
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: Number,
      default: null
    },
    created_date: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      statuses,
      lastClickTime: 0
    };
  },
  methods: {
    onDoubleClick() {
      const timeSince = new Date().getTime() - this.lastClickTime;

      if (timeSince < 600 && timeSince > 0) {
        this.$router.push({ name: "view", params: { id: String(this.id) } });
      }

      this.lastClickTime = new Date().getTime();
    }
  },
  computed: {
    statusColor() {
      return this.statuses.find(status => status.id === this.status).color;
    }
  }
};
</script>

<style scoped lang="sass">
@import "../../sass/variables"
.task
  display: flex
  flex-flow: column
  padding: 20px
  border-radius: $radius

  .title
    font-size: 30px
    white-space: nowrap
    padding: 5px
    text-overflow: ellipsis
    overflow: hidden

  .description
    font-size: 18px
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: 2
    overflow: hidden
    text-overflow: ellipsis

  .description-text
    display: block
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
</style>
