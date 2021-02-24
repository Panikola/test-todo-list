<template lang="pug">
  div.home
    div.loading( v-if="loading" ) Loading...
    template(v-else)
      TaskPreview.item(v-for="task in tasks" :key="task.id" v-bind="task")
</template>

<script>
import { fetchTasks } from "@/api/tasks";
import TaskPreview from "@/components/task/TaskPreview";

export default {
  name: "TasksList",
  components: { TaskPreview },
  data() {
    return {
      loading: false,
      tasks: []
    };
  },
  methods: {
    async fetchTasks() {
      this.loading = true;
      try {
        this.tasks = await fetchTasks();
        if (!this.tasks.length) {
          await this.$router.push({ name: "create" });
          this.$toasted.show("Создайте первую задачу что бы увидеть список");
        }
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      async () => await this.fetchTasks(),
      { immediate: true }
    );
  }
};
</script>
<style scoped lang="sass">
@import "../sass/mixins"
.home
  @include page
  .item
    @include page-item
    cursor: pointer
  .loading
    @include page-item
</style>
