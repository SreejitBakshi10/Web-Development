$(function () {
  $("#navbarToggle").blur(function () {
    if (window.innerWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  function showLoading(selector) {
    insertHtml(selector, "<div class='text-center'><img src='images/ajax-loader.gif'></div>");
  }

  function insertProperty(string, propName, propValue) {
    return string.replace(new RegExp("{{" + propName + "}}", "g"), propValue);
  }

  // Función switchMenuToActive agregada
  function switchMenuToActive() {
    document.querySelector("#navHomeButton").classList.remove("active");
    document.querySelector("#navMenuButton").classList.add("active");
  }

  document.addEventListener("DOMContentLoaded", function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowHomeHTML, true);
  });

  function buildAndShowHomeHTML(categories) {
    $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {
      var chosenCategory = chooseRandomCategory(categories);
      if (chosenCategory) {
        var chosenCategoryShortName = chosenCategory.short_name;
        var homeHtmlToInsert = insertProperty(homeHtml, "randomCategoryShortName", chosenCategoryShortName);
        insertHtml("#main-content", homeHtmlToInsert);
      } else {
        console.error("No se pudo seleccionar una categoría aleatoria.");
      }
    }, false);
  }

  function chooseRandomCategory(categories) {
    return categories && categories.length ? categories[Math.floor(Math.random() * categories.length)] : null;
  }

  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
  };

  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort + ".json", buildAndShowMenuItemsHTML);
  };

  function buildAndShowCategoriesHTML(categories) {
    $ajaxUtils.sendGetRequest(categoriesTitleHtml, function (categoriesTitleHtml) {
      $ajaxUtils.sendGetRequest(categoryHtml, function (categoryHtml) {
        switchMenuToActive(); // Llamada a switchMenuToActive
        var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
        insertHtml("#main-content", categoriesViewHtml);
      }, false);
    }, false);
  }

  function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
    var finalHtml = categoriesTitleHtml + "<section class='row'>";
    if (categories && categories.length) {
      categories.forEach(function (category) {
        var html = insertProperty(categoryHtml, "name", category.name);
        html = insertProperty(html, "short_name", category.short_name);
        finalHtml += html;
      });
    }
    return finalHtml + "</section>";
  }

  function buildAndShowMenuItemsHTML(categoryMenuItems) {
    $ajaxUtils.sendGetRequest(menuItemsTitleHtml, function (menuItemsTitleHtml) {
      $ajaxUtils.sendGetRequest(menuItemHtml, function (menuItemHtml) {
        switchMenuToActive(); // Llamada a switchMenuToActive
        var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);
        insertHtml("#main-content", menuItemsViewHtml);
      }, false);
    }, false);
  }

  function buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
    if (!categoryMenuItems || !categoryMenuItems.category) return "";
    menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", categoryMenuItems.category.name || "");
    menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions || "");
    var finalHtml = menuItemsTitleHtml + "<section class='row'>";
    if (categoryMenuItems.menu_items && categoryMenuItems.menu_items.length) {
      categoryMenuItems.menu_items.forEach(function (item) {
        var html = insertProperty(menuItemHtml, "short_name", item.short_name || "");
        html = insertProperty(html, "name", item.name || "");
        html = insertProperty(html, "description", item.description || "");
        finalHtml += html;
      });
    }
    return finalHtml + "</section>";
  }

  window.$dc = dc;
})(window);
