import { defineComponent } from 'vue';
import {useRoute} from "vue-router"

export default defineComponent({
  name: 'PageD',
  setup() {
    const route = useRoute()
    const onClick = () => {
      console.log(route.fullPath);
      
    }
    return () => {
      return (
        <div>
          {route.fullPath}
        </div>
        
      )
    }
  },
  
})