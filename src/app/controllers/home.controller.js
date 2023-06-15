import sequelize from "../database/connect.js";
import Worker_Model from "../models/Worker_Model.js";

const getHome = async (req, res) => {
    try {
        const whereoptions = {};
        if (req.user.role !== "admin") {
            whereoptions.UserId = req.user.id;
        }

        const totalWorkers = await Worker_Model.count({ where: whereoptions });
        const availableWorkers = await Worker_Model.count({ where: { ...whereoptions, availability: true } });
        const unavailableWorkers = totalWorkers - availableWorkers;
        const availableWorkersPercent = Math.round((availableWorkers / totalWorkers) * 100);
        const unavailableWorkersPercent = 100 - availableWorkersPercent;

        let workersByDepartment = null;
        if (req.user.role === "admin") {
            workersByDepartment = await sequelize.query(`
                SELECT Users.department, COUNT(Workers.id) AS count
                FROM Users
                LEFT JOIN Workers ON Users.id = Workers.UserId
                GROUP BY Users.department
                ORDER BY Users.department;
            `)

            workersByDepartment = workersByDepartment[0]
        }

        const dashboardStats = {
            workersStats: {
                totalWorkers,
                availableWorkers: { percent: availableWorkersPercent, total: availableWorkers },
                unavailableWorkers: { percent: unavailableWorkersPercent, total: unavailableWorkers },
            },
            workersByDepartment,
        };

        console.log(dashboardStats);

        return res.render("pages/Dashboard", {
            dashboardStats,
            user: req.user,
            messages: req.flash().messages,
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export {
    getHome
}