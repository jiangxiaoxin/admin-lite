<template>
  <h1>page c</h1>
  <ol>
    <li>
      <p>
    在路由配置中，层级嵌套时，不要太深，一般2级到3级就可以了，再多就不够明确了
  </p>
    </li>
    <li>
      <p>
        以about为例，它里面的路由层级很深，并且使用alwaysShow越过父子合并，那对于sub-menu，它是不会触发select事件的，也就无法通过点击完成路由跳转，但这并不是说对应的路由是无法进入的，路由依然可以进入，但是不能通过菜单的形式进入。如果真的想通过点击进入，可以通过监听open和close事件，然后通过meta.jump 去判断是不是要跳。但这一般不要这种情况，因为此时菜单会执行打开或者关闭的动作，不好。
      </p>
      <p>
        <pre>
        // const handleOpen = (index: string, indexPath: string[], item: any) => {
        //   console.log(index, indexPath, item, router.getRoutes());
        //   const route = router.getRoutes().find((item) => item.path == index);
        //   if (route?.meta?.jump == true) {
        //     router.push({
        //       path: index,
        //     });
        //   }
        // };
        </pre>
      </p>
    </li>
  </ol>
  
</template>