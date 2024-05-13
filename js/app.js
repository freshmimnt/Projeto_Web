const faqs = document.querySelectorAll(".pf");

faqs.forEach((pf) =>{
    pf.addEventListener("click", () =>{
        pf.classList.toggle("active");
    });
});