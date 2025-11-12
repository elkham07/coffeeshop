$(document).ready(function(){

    console.log("Website loaded and jQuery is ready!");

    /* 1. MOBILE NAV TOGGLE */
    $(".logo").on("click", function () {
        $(".nav-links").slideToggle(300);
    });



    /* 2. SCROLL ANIMATION */
    $(window).on("scroll", function () {
        $(".feature, .card, .gallery-grid img").each(function () {
            let pos = $(this).offset().top;
            let winTop = $(window).scrollTop();

            if (pos < winTop + 700) {
                $(this).addClass("fade-in");
            }
        });
    });


    /* 3. GALLERY – CLICK TO ENLARGE */
    $(".gallery-grid img").on("click", function () {
        const src = $(this).attr("src");

        // Create modal dynamically
        $("body").append(`
            <div class="img-modal">
                <div class="img-modal-content">
                    <img src="${src}">
                </div>
            </div>
        `);

        $(".img-modal").fadeIn(200);

        // Close when click outside
        $(".img-modal").on("click", function () {
            $(this).fadeOut(200, function () {
                $(this).remove();
            });
        });
    });



    /* 4. CONTACT FORM VALIDATION */
    $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        
        let valid = true;
        
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const msg = $("#message").val().trim();
    
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        $("#name-error, #email-error, #message-error").text("");
    
        if (name.length < 2) {
            $("#name-error").text("Name must be at least 2 characters.");
            valid = false;
        }
    
        if (!emailReg.test(email)) {
            $("#email-error").text("Enter a valid email address.");
            valid = false;
        }
    
        if (msg.length < 10) {
            $("#message-error").text("Message must be at least 10 characters.");
            valid = false;
        }
    
        if (valid) {
            alert("Message successfully sent!");
            this.reset();
        }
    });
    



    /* 5. MENU SPECIAL CARDS HOVER */
    $(".card").hover(
        function () {
            $(this).animate({ opacity: 0.7, padding: "25px" }, 200);
        },
        function () {
            $(this).animate({ opacity: 1, padding: "20px" }, 200);
        }
    );



    /* 6. SCROLL TO TOP BUTTON */
    $("body").append(`<button id="top-btn">↑</button>`);

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 400) {
            $("#top-btn").fadeIn();
        } else {
            $("#top-btn").fadeOut();
        }
    });

    $("#top-btn").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

});



// Добавление нового напитка
$("#add-drink-btn").on("click", function () {
    const name = $("#new-drink").val().trim();
    const size = $("#new-size").val().trim();
    const price = $("#new-price").val().trim();

    if (!name || !size || !price) { alert("Fill all fields"); return; }

    const row = `<tr>
        <td>${name}</td>
        <td>${size}</td>
        <td>${price}</td>
        <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
    </tr>`;
    $("#menu-body").append(row);

    $("#new-drink, #new-size, #new-price").val("");
});

// Удаление
$(document).on("click", ".delete-btn", function () {
    if (confirm("Are you sure you want to delete this item?")) {
        $(this).closest("tr").fadeOut(300, function () { $(this).remove(); });
    }
});

// Редактирование
$(document).on("click", ".edit-btn", function () {
    const row = $(this).closest("tr");
    const cells = row.find("td");
    const name = cells.eq(0).text();
    const size = cells.eq(1).text();
    const price = cells.eq(2).text();

    cells.eq(0).html(`<input type="text" value="${name}">`);
    cells.eq(1).html(`<input type="text" value="${size}">`);
    cells.eq(2).html(`<input type="text" value="${price}">`);
    $(this).text("Save").removeClass("edit-btn").addClass("save-btn");
});

$(document).on("click", ".save-btn", function () {
    const row = $(this).closest("tr");
    const inputs = row.find("input");
    row.find("td").eq(0).text(inputs.eq(0).val());
    row.find("td").eq(1).text(inputs.eq(1).val());
    row.find("td").eq(2).text(inputs.eq(2).val());
    $(this).text("Edit").removeClass("save-btn").addClass("edit-btn");
});

// Поиск по таблице
$("#search-drink").on("keyup", function () {
    const val = $(this).val().toLowerCase();
    $("#menu-body tr").filter(function () {
        $(this).toggle($(this).find("td").eq(0).text().toLowerCase().indexOf(val) > -1)
    });
});


// Фильтр
$(".filter-btn").on("click", function () {
    const cat = $(this).data("cat");
    $(".gallery-grid img").each(function () {
        if (cat === "all" || $(this).data("cat") === cat) $(this).show();
        else $(this).hide();
    });
});

// Lightbox с навигацией
let galleryImgs = $(".gallery-grid img").toArray();
let currentIndex = 0;

$(".gallery-grid img").on("click", function () {
    currentIndex = galleryImgs.indexOf(this);
    showLightbox(currentIndex);
});

function showLightbox(index) {
    const src = galleryImgs[index].src;
    $("body").append(`
        <div class="img-modal">
            <div class="img-modal-content">
                <span class="prev">&lt;</span>
                <img src="${src}">
                <span class="next">&gt;</span>
            </div>
        </div>
    `);
    $(".img-modal").fadeIn(200);
}

// Навигация
$(document).on("click", ".next", function (e) { e.stopPropagation(); nextImg(); });
$(document).on("click", ".prev", function (e) { e.stopPropagation(); prevImg(); });
$(".img-modal").on("click", function () { $(this).fadeOut(200, function() { $(this).remove(); }); });

function nextImg() { currentIndex = (currentIndex + 1) % galleryImgs.length; $(".img-modal img").attr("src", galleryImgs[currentIndex].src); }
function prevImg() { currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length; $(".img-modal img").attr("src", galleryImgs[currentIndex].src); }

