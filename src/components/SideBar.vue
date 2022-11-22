<template>
  <div>
    <div class="sidebar-left">
      <ul>
        <li
          v-for="item in arrItem"
          :key="item.value"
          :id="item.value"
          @click="handleScrollTo(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>

    <div class="content">
      <div
        v-for="item in arrItem"
        :key="item.value"
        style="height: 100vh"
        :class="item.value"
      >
        <h1>{{ item.text }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { arrItem } from "../constants";
export default {
  data() {
    return {
      arrItem,
      mySet: [],
      scrollY: 2,
    };
  },
  methods: {
    getInfoElm() {
      const parentElm = document.querySelector(".content").children;
      for (let i = 0; i < parentElm.length; i++) {
        const elm = {
          top: parentElm[i].getBoundingClientRect().top,
          bottom: parentElm[i].getBoundingClientRect().bottom,
          name: parentElm[i].className,
          height: parentElm[i].getBoundingClientRect().height,
        };
          this.mySet.push(elm);
      }
    },
    scroll() {
      this.scrollY =  window.scrollY+2;
      this.mySet?.forEach((item) => {
        {
          if (this.scrollY >= item.top && this.scrollY < item.bottom) {
            document.querySelector(`#${item.name}`).classList.add("active");
          } else {
            document.querySelector(`#${item.name}`).classList.remove("active");
          }
        }
      });
    },
    handleScrollTo(item) {
      this.mySet?.forEach((i) => {
        if (i.name === item.value) {
          window.scrollTo(0, i.top);
          localStorage.setItem("reload", window.scrollY);
        }
      });
    },
    reload() {
      localStorage.setItem("myset", JSON.stringify(this.mySet));
    },
  },
  mounted() {
    document.querySelector("#title1").classList.add("active");
    if(JSON.parse(localStorage.getItem("myset"))){
      this.mySet = JSON.parse(localStorage.getItem("myset"))
    }else {
      this.getInfoElm();
    }
    window.addEventListener("scroll", this.scroll);
    window.addEventListener("beforeunload", this.reload);
    this.scrollY = localStorage.getItem("reload")
      ? localStorage.getItem("reload")
      : window.scrollY;
  },
  unmounted() {
    window.removeEventListener("scroll", this.scroll);
  },
};
</script>

<style>
.sidebar-left {
  position: fixed;
}
ul {
  list-style: none;
}
li {
  padding: 20px;
  border: 1px solid black;
  border-radius: 16px;
  margin-top: 20px;
  cursor: pointer;
}
.content {
  background-color: #f2f2f2;
  border: 1px solid black;
  width: 500px;
  float: right;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
}
.content div {
  height: 900px;
  border: 1px solid black;
}
.active {
  background: red;
}
</style>
