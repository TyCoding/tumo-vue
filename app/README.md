# Vue-App

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build:prod
```

# Notes

> 父组件如何给子组件传值？

1. 在父组件中定义：

```html
<son :content="post.content"></son>

<script>
new Vue({
    el: '#app',
    data: {
        post: { content: '我是父组件中的值' }
    }
})
</script>
```

2. 在子组件中定义：

```html
<div>{{content}}</div>

<script>
new Vue({
    el: '#app',
    props: ["content"] 
})
</script>
```

`props: ["content"]` 即可接收到父组件中传递的`post.content`数据，此`props`中接收的值相当于自动绑定在`data`中，可以直接使用

<br/>

> 如果父组件传递给子组件的值可能会被改变怎么处理？

某些情况中，父组件传递给子组件的值并不一定仅用于显示，还可能用于修改。比如页面是一个父组件，其中包含一个富文本，我们将这个富文本封装为子组件，那么想要用这个页面修改数据，就要先在页面中显示数据，然后用户可以进行修改。
这时你可能会根据上面讲到的用`props["""]`接收父组件传递的要展示的数据，这样：

1. 在父组件中

```html
<son :content="post.content"></son>

<script>
new Vue({
    el: '#app',
    data: {
        post: { content: '我是父组件中的值' }
    }
})
</script>
```

2. 在子组件中

```html
<textarea v-model="content"></textarea>

<script>
new Vue({
    el: '#app',
    props: ["content"] 
})
</script>
```

如上，很正常，这个页面确实有父组件传递的数据了，但是，当我们修改`<textarea>`中的值，浏览器控制台就会报错：`[Vue warn]: Avoid mutating a prop directly since the value will be overwritten`。

意思是说，子组件中尝试修改`props`中定义的值，这是父组件传来的，但是不可修改的。

那么，为了解决这个问题，我们应该**在子组件中重新定义一个属性用于存放`<textarea>`中动态变化的数据，且这个属性的初始值应该是`props`中接收到的值**，这样就既实现了展示数据，有能修改数据，如下：

3. 修改子组件中的定义：

```html
<textarea v-model="md"></textarea>

<script>
new Vue({
    el: '#app',
    props: ["content"],
    data: { md: '' },
    watch: {
        content(newVal, oldVal) {
            this.md = newVal;
        }
    }
})
</script>
```

如上就完成了需求，`watch`是vue提供的监听方法，当刚进入页面时，vue就监听到`content`的值改变了（因为它来自父组件），那么就触发一次监听方法，我们用`this.md = newVal` 将这个新值赋值给`md`，那么子组件的文本框就就正常展示要修改的数据，写可以正常修改。

<br/>

> 完成了修改，如何将子组件中更新（修改）的值提交给父组件呢？

经上面几个过程，父组件已经可以正常将数据传递给子组件，并且子组件可以进行修改更新数据。那么想要将子组件更新的数据重新传递给子组件，我们需要用到`$emit()`，如下：

4. 修改父组件中的定义：

```html
<son :content="post.content" @updateContent="updateContent"></son>

<script>
new Vue({
    el: '#app',
    data: {
        post: { content: '我是父组件中的值' }
    },
    methods: {
        updateContent(val) {
            console.log("父组件接收到的值:" + val);
        }
    }
})
</script>
```

5. 修改子组件中的定义：

```html
<textarea v-model="md"></textarea>

<script>
new Vue({
    el: '#app',
    props: ["content"],
    data: { md: '' },
    watch: {
        content(newVal, oldVal) {
            this.md = newVal;
        },
        md(newVal, oldVal) {
            //监听子组件中数据
            this.$emit('updateContent', newVal);
        }
    }
})
</script>
```

如上，当文本域中`md`的值改变，就会触发`watch`监听，这时调用`this.$emit('updateContent', newVal);`就能将值发送给父组件，其中的`updateContent`是在父组件中定义的`@xx="updateContent"`。而这个`xx`也就是父组件中的`@updateContent`，他是在父组件中定义的方法。

父组件中的`updateContent(val)`方法就相当于一个监听事件，只要子组件`this.$emit()`执行了，父组件中这个方法就会监听到，其中的`val`就是子组件传递来的值。


