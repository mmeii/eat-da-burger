//wait to attach handlers until DOM is fully loaded
$(function () {
    //function on click, change burger state to devoured_burger
    $(".devoure_burger").on("click", function (event) {
        let id = $(this).data("id");
        let newState = $(this).data("newstate");

        let newBurgerState = {
            devoured: true
        };

        // send the PUT request
        $.ajax("/api/cats/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(() => {
            console.log("changed state to", newState);
            //reload the page to get the updated list
            location.reload();
        })
    })

    $("#addBurgerForm").on("submit", (event) => {
        //preventDefault on a submit event
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burgerToEat").val().trim()
        };

        console.log(newBurger);

        //send the POST request
        $.post("/api/burgers", newBurger).then(() => {
            location.reload();
        });
    });

    $(".delete-burger").on("click", function (event) {
        let id = $(this).data("id");

        //send DELETE request
        $.ajax("/api/cats/" + id, {
            type: "DELETE"
        }).then(() => {
            console.log("deleted burger", id);
            //reload the page to get the updated list
            location.reload();
        });
    });
})