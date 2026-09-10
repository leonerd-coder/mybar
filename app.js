const defaultIngredients = [
  { name: "진", type: "base" },
  { name: "럼", type: "base" },
  { name: "브랜디", type: "base" },
  { name: "스카치위스키", type: "base" },
  { name: "버번위스키", type: "base" },
  { name: "보드카", type: "base" },
  { name: "깔루아", type: "liqueur" },
  { name: "트리플섹", type: "liqueur" },
  { name: "크렘드카카오 화이트", type: "liqueur" },
  { name: "크렘드카카오 브라운", type: "liqueur" },
  { name: "생제르망", type: "liqueur" },
  { name: "디사론노", type: "liqueur" },
  { name: "페퍼민트그린", type: "liqueur" },
  { name: "피치트리", type: "liqueur" },
  { name: "말리부럼", type: "liqueur" },
  { name: "힙노틱", type: "liqueur" },
  { name: "버터스카치리큐르", type: "liqueur" },
  { name: "블루큐라소", type: "liqueur" },
  { name: "바나나리큐르", type: "liqueur" },
  { name: "리몬첼로", type: "liqueur" },
  { name: "멜론리큐르", type: "liqueur" },
  { name: "바닐라시럽", type: "syrup" },
  { name: "그레나딘시럽", type: "syrup" },
  { name: "그린애플시럽", type: "syrup" },
  { name: "모히또민트시럽", type: "syrup" },
  { name: "리치시럽", type: "syrup" },
  { name: "자몽시럽", type: "syrup" },
  { name: "카시스시럽", type: "syrup" },
  { name: "수박시럽", type: "syrup" },
  { name: "블루큐라소시럽", type: "syrup" },
  { name: "엘더플라워시럽", type: "syrup" },
  { name: "코코넛시럽", type: "syrup" },
  { name: "피치시럽", type: "syrup" },
  { name: "검시럽", type: "syrup" },
  { name: "콜라", type: "mixer" },
  { name: "사이다", type: "mixer" },
  { name: "오렌지주스", type: "mixer" },
  { name: "크랜베리주스", type: "mixer" },
  { name: "파인애플주스", type: "mixer" },
  { name: "사과주스", type: "mixer" },
  { name: "우유", type: "mixer" },
  { name: "토닉워터", type: "mixer" }
];
const cocktails = [
  {
    name: "진토닉",
    ingredients: ["진", "토닉워터"],
    description: "진과 토닉워터를 얼음과 함께 가볍게 즐기는 기본 칵테일."
  },
  {
    name: "스크루드라이버",
    ingredients: ["보드카", "오렌지주스"],
    description: "보드카와 오렌지주스를 섞는 간단하고 부드러운 칵테일."
  },
  {
    name: "말리부 오렌지",
    ingredients: ["말리부럼", "오렌지주스"],
    description: "코코넛 풍미와 오렌지의 달콤한 조합."
  },
  {
    name: "퍼지 네이블",
    ingredients: ["피치트리", "오렌지주스"],
    description: "복숭아와 오렌지의 달콤하고 상큼한 칵테일."
  },
  {
    name: "블랙 러시안",
    ingredients: ["보드카", "깔루아"],
    description: "보드카와 커피 리큐르의 진하고 달콤한 조합."
  },
  {
    name: "화이트 러시안",
    ingredients: ["보드카", "깔루아", "우유"],
    description: "블랙 러시안에 우유를 더한 부드러운 칵테일."
  },
  {
    name: "블루 하와이안 스타일",
    ingredients: ["럼", "블루큐라소", "파인애플주스"],
    description: "럼과 블루큐라소, 파인애플의 달콤한 트로피컬 조합."
  },
  {
    name: "아마레또 오렌지",
    ingredients: ["디사론노", "오렌지주스"],
    description: "아몬드 향의 디사론노와 오렌지의 조합."
  },
  {
    name: "멜론볼",
    ingredients: ["보드카", "멜론리큐르", "오렌지주스"],
    description: "멜론의 달콤한 향과 오렌지가 어우러진 칵테일."
  },
  {
    name: "피치 크랜베리",
    ingredients: ["피치트리", "크랜베리주스"],
    description: "복숭아와 크랜베리의 달콤하고 새콤한 조합."
  },
  {
    name: "럼 콜라",
    ingredients: ["럼", "콜라"],
    description: "럼과 콜라를 간단하게 즐기는 클래식 하이볼."
  },
  {
    name: "보드카 크랜베리",
    ingredients: ["보드카", "크랜베리주스"],
    description: "보드카와 크랜베리의 깔끔하고 상큼한 조합."
  }
];
let ingredients = JSON.parse(
  localStorage.getItem("mybar-ingredients")
);
if (!ingredients) {
  ingredients = defaultIngredients;
  saveIngredients();
}
function saveIngredients() {
  localStorage.setItem(
    "mybar-ingredients",
    JSON.stringify(ingredients)
  );
}
function render() {
  const ingredientList = document.getElementById("ingredientList");
  const cocktailList = document.getElementById("cocktailList");
  document.getElementById("ingredientCount").textContent =
    ingredients.length;
  const owned = new Set(
    ingredients.map(item => item.name)
  );
  const available = cocktails.filter(cocktail =>
    cocktail.ingredients.every(item => owned.has(item))
  );
  document.getElementById("cocktailCount").textContent =
    available.length;
  if (ingredients.length === 0) {
    ingredientList.innerHTML =
      '<div class="empty">아직 등록된 재료가 없습니다.</div>';
  } else {
    ingredientList.innerHTML = ingredients
      .map((item, index) => `
        <div class="ingredient">
          <div class="ingredient-info">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${typeName(item.type)}</span>
          </div>
          <button class="delete-btn" onclick="removeIngredient(${index})">
            삭제
          </button>
        </div>
      `)
      .join("");
  }
  if (available.length === 0) {
    cocktailList.innerHTML =
      '<div class="empty">현재 보유 재료로 만들 수 있는 추천 칵테일이 없습니다.</div>';
  } else {
    cocktailList.innerHTML = available
      .map(cocktail => `
        <div class="cocktail-card">
          <h4>🍸 ${escapeHtml(cocktail.name)}</h4>
          <p>${escapeHtml(cocktail.description)}</p>
          <span class="tag">
            ${cocktail.ingredients.map(escapeHtml).join(" · ")}
          </span>
        </div>
      `)
      .join("");
  }
}
function typeName(type) {
  const names = {
    base: "베이스",
    liqueur: "리큐르",
    syrup: "시럽",
    mixer: "주스 / 믹서",
    other: "기타"
  };
  return names[type] || "기타";
}
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function removeIngredient(index) {
  ingredients.splice(index, 1);
  saveIngredients();
  render();
}
window.removeIngredient = removeIngredient;
function openModal() {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("ingredientInput").focus();
}
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("ingredientInput").value = "";
}
document.getElementById("addBtn").addEventListener(
  "click",
  openModal
);
document.getElementById("addBtn2").addEventListener(
  "click",
  openModal
);
document.getElementById("closeModal").addEventListener(
  "click",
  closeModal
);
document.getElementById("modal").addEventListener(
  "click",
  event => {
    if (event.target.id === "modal") {
      closeModal();
    }
  }
);
document.getElementById("saveIngredient").addEventListener(
  "click",
  () => {
    const input =
      document.getElementById("ingredientInput");
    const name = input.value.trim();
    if (!name) {
      alert("재료 이름을 입력해주세요.");
      return;
    }
    const exists = ingredients.some(
      item => item.name === name
    );
    if (exists) {
      alert("이미 등록된 재료입니다.");
      return;
    }
    ingredients.push({
      name,
      type: document.getElementById("ingredientType").value
    });
    saveIngredients();
    render();
    closeModal();
  }
);
document
  .getElementById("ingredientInput")
  .addEventListener("keydown", event => {
    if (event.key === "Enter") {
      document.getElementById("saveIngredient").click();
    }
  });
document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item")
      .forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".page")
      .forEach(page => page.classList.remove("active"));
    button.classList.add("active");
    document
      .getElementById(button.dataset.page)
      .classList.add("active");
  });
});
render();
