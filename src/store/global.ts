import { defineStore } from "pinia"

export const useGlobalStore = defineStore("global", {
  state() {
      return {
        menuExpanded: true
      }
  },
  actions: {
    toggleExpanded() {
      this.menuExpanded = !this.menuExpanded
    }
  }
})