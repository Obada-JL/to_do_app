//theme icon selects
const theme_class = document.querySelector("#theme_icon");
const check_box = document.getElementsByClassName("check");
const input_checkbox = document.getElementById("check");
const item_check = document.querySelector(".item_check");
const theme_icon_class = document.querySelector("[id = theme_icon]");
const images_in_div = theme_class.getElementsByTagName("img");
const checked_icon = document.getElementById("checked_icon");
const checked_icon_class = document.getElementsByClassName("checked_icon");
const task_container = document.getElementsByClassName("task_container");
const task = document.getElementsByClassName("task");
const x_icon = document.getElementsByClassName("x_icon");
const placeholder = document.getElementById("placeholder");
const clear_completed = document.getElementById("clear_completed");
const name_completed = document.querySelector('[name="completed"]');
const all_tasks = document.getElementById("all_tasks");
const active_tasks = document.getElementById("active_tasks");
const completed_tasks = document.getElementById("completed_tasks");
const remain_items = document.getElementById("remain_items");
const task_list = document.getElementById("task_list");
const body = document.querySelector("body");
const create_list_flex = document.querySelector(".create_list_flex");
const tasks_properties = document.querySelectorAll("tasks");
const bottom_flex = document.querySelector("#bottom_flex");
const x_icon_select = document.querySelectorAll("x_icon");

const empty_var = "";
const sun_var = "icon-sun.svg";
const moon_var = "icon-moon.svg";
//checkbox selects

window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";
});
const icons_same_properties = (sun, moon) => {
  const theme_icon_html = document.createElement("a");
  const imageElement = document.createElement("img");
  theme_icon_html.appendChild(imageElement);
  imageElement.style.scale = "150%";
  theme_icon_class.insertAdjacentElement("afterend", theme_icon_html);
  theme_class.appendChild(theme_icon_html);
  imageElement.src = sun;
  imageElement.src = moon;
};
theme_class.addEventListener("click", () => {
  var source = image_sun_html.src;
  const source_last_element = source.split("/")[source.split("/").length - 1];

  if (images_in_div.length > 0) {
    if (source_last_element === sun_var) {
      image_sun_html.src = moon_var;
    } else {
      image_sun_html.src = sun_var;
    }
  }

  if (source_last_element === sun_var) {
    body.classList.add("body_light_theme_properties");
    create_list_flex.classList.add("create_list_flex_light_theme");
    bottom_flex.classList.add("bottom_flex_light_theme");
    placeholder.classList.add("placeholder_light_theme");
    for (let i = 0; i < task_list.children.length; i++) {
      task_container[i].classList.add("tasks_light_theme");
      task[i].classList.add("task_light_theme");
      x_icon[i].classList.add("x_icon_light_theme");
    }
  } else if (source_last_element === moon_var) {
    body.classList.remove("body_light_theme_properties");
    create_list_flex.classList.remove("create_list_flex_light_theme");
    bottom_flex.classList.remove("bottom_flex_light_theme");
    placeholder.classList.remove("placeholder_light_theme");
    for (let i = 0; i < task_list.children.length; i++) {
      task_container[i].classList.remove("tasks_light_theme");
      task[i].classList.remove("task_light_theme");

      x_icon[i].classList.remove("x_icon_light_theme");
    }
  }
  return;
});

let tasks = [];
let display_items = [];

function slist (task_list) {
  let items = task_list.children, current = null;
  
  for (let i =  0; i < items.length; i++) {/* for (let i of items) { */
    console.log(items[i])
    items[i].draggable = true;
    items[i].ondragstart = e => {
      current = items[i];}
      items[i].ondragover = e => e.preventDefault();
      items[i].ondrop = e => {
      e.preventDefault();
      if (items[i] != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (items[i] == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          items[i].parentNode.insertBefore(current, items[i].nextSibling);
        } else {
          items[i].parentNode.insertBefore(current, items[i]);
        }
      }
    };
  }
}
const CreateEmptyDiv = () => {
  const newItem = document.createElement("div");
  newItem.classList.add("task_container");
  newItem.classList.add("create_list_flex");


  const check = document.createElement("div");
  check.classList.add("check");
  check.classList.add("item_check");

  const image = document.createElement("img");
  image.src = "icon-check.svg";
  image.classList.add("checked_icon");
  image.style.scale = "150%";
  image.style.display = "none";

  const li_item = document.createElement("li");
  li_item.classList.add("task");
  li_item.innerText = tasks[tasks.length - 1];

  const x_icon = document.createElement("a");
  x_icon.classList.add("x_icon");
  const x_code = document.createElement("p");
  x_icon.classList.add("x_code");
  x_code.innerHTML = "&#10005";

  newItem.appendChild(check);
  newItem.appendChild(image);
  newItem.appendChild(li_item);
  newItem.appendChild(x_icon);

  check.appendChild(image);
  x_icon.appendChild(x_code);
  newItem.setAttribute("name", "active");

  check.addEventListener("click", () => {
    check.classList.add("checked_box");
    image.style.display = "block";
    li_item.style.color = "grey";
    li_item.style.textDecoration = "line-through";
    newItem.setAttribute("name", "completed");
  });

  x_icon.addEventListener("click", () => {
    newItem.remove(newItem);
    count_items();
    alert("Are you sure to clear this task ?");
    
  });

  count_items();
  return newItem;
};

input_checkbox.addEventListener("click", () => {
  const task_input = document.getElementById("placeholder");
  const task_value = task_input.value;

  if (task_value.length > 0) {
    tasks.push(task_value);
    const newItem = CreateEmptyDiv();
    task_list.insertBefore(newItem, task_list.firstChild);
    const empty_input = () => {
      placeholder.value = "";
    };
    empty_input();
  }
  slist(task_list)
});
//errors: all active completed buttons and count items when cleared
clear_completed.addEventListener("click", () => {
  for (let i = 0; i < task_list.children.length; i++) {
    const name_attribute = task_container[i].getAttribute("name");
    if (name_attribute === "completed") {
      task_container[i].remove();
      alert("are you sure to clear completed tasks ?")
    }
  }
  count_items();
});
all_tasks.addEventListener("click", () => {
  for (let i = 0; i < task_list.children.length; i++) {
    const name_attribute = task_container[i].getAttribute("name");
    if (name_attribute === "active" || "completed") {
      task_container[i].style.display = "flex";
    }
  }
});

active_tasks.addEventListener("click", () => {
  for (let i = 0; i < task_list.children.length; i++) {
    const name_attribute = task_container[i].getAttribute("name");
    if (name_attribute === "completed") {
      task_container[i].style.display = "none";
    } else if (name_attribute === "active") {
      task_container[i].style.display = "flex";
    }
  }
});

completed_tasks.addEventListener("click", () => {
  for (let i = 0; i < task_list.children.length; i++) {
    const name_attribute = task_container[i].getAttribute("name");
    if (name_attribute === "active") {
      task_container[i].style.display = "none";
    } else if (name_attribute === "completed") {
      task_container[i].style.display = "flex";
    }
  }
});
const count_items = () => {
  const list_length = task_container.length + 1;
  for (let i = 0; i < list_length; i++) {
    if (list_length == 1 || 0) {
      remain_items.innerHTML = `${list_length} item remaining`;
    }
    remain_items.innerText = `${list_length} items remaining`;
  }
};
