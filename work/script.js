
        const projects = [
            {
                id: 1,
                name: "Project Alpha",
                description: "Modern web application with stunning visuals",
                img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
                client: "Tech Corp",
                year: "2024",
                category: "Web Design"
            },
            {
                id: 2,
                name: "Project Beta",
                description: "E-commerce platform with seamless UX",
                img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
                client: "Shop Inc",
                year: "2024",
                category: "E-Commerce"
            },
            {
                id: 3,
                name: "Project Gamma",
                description: "Creative portfolio with dynamic animations",
                img: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=800&h=600&fit=crop",
                client: "Creative Studio",
                year: "2023",
                category: "Portfolio"
            },
            {
                id: 4,
                name: "Project Delta",
                description: "Mobile-first design system",
                img: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e?w=800&h=600&fit=crop",
                client: "Mobile Co",
                year: "2023",
                category: "Mobile Design"
            }
        ];
        // Simpan data projects ke localStorage agar bisa diakses di halaman detail
        localStorage.setItem('projects', JSON.stringify(projects));

        document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);
            
            const workContainer = document.querySelector(".work");
            
            const createWorkitem = (project) => {
                const workItem = document.createElement("div");
                workItem.className = "work-item";
                workItem.innerHTML = `
                    <div class="work-item-img" data-project-id="${project.id}">
                        <img src="${project.img}" alt="${project.name}">
                    </div>
                    <div class="work-item-copy">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                    </div>
                `;
                
                // Tambahkan event listener untuk klik
                const imgContainer = workItem.querySelector('.work-item-img');
                imgContainer.addEventListener('click', () => {
                    window.location.href = `work-detail.html?id=${project.id}`;
                });
                
                return workItem;
            }

            for(let i = 0; i < projects.length * 2; i += 2){
                const row = document.createElement("div");
                row.className = "row";

                const leftitemIndex = i % projects.length;
                const rightItemIndex = (i + 1) % projects.length;

                row.appendChild(createWorkitem(projects[leftitemIndex]));

                if(i + 1 < projects.length * 2){
                    row.appendChild(createWorkitem(projects[rightItemIndex]));
                }

                workContainer.appendChild(row);
            }

            gsap.set(".work-item", {
                y: 1000,
            });

            document.querySelectorAll(".row").forEach((row) => {
                const workItems = row.querySelectorAll(".work-item");

                workItems.forEach((item, itemIndex) => {
                    const isleftProjectItem = itemIndex === 0;

                    gsap.set(item, {
                        rotation: isleftProjectItem ? -60 : 60,
                        transformOrigin: "center center"
                    });
                });
                
                ScrollTrigger.create({
                    trigger: row,
                    start: "top 60%",
                    onEnter: () => {
                        gsap.to(workItems, {
                            y: 0,
                            rotation: 0,
                            duration: 1,
                            ease: "power4.out",
                            stagger: 0.25
                        });
                    }
                });
            });
        });
