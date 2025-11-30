const DashboardRepository = require('../repositories/dashboard.repository');

class DashboardController {
    constructor() {
        this.dashboardRepository = new DashboardRepository();
    }

    async getDashboardData(req, res, next) {
        try {
            const dados = await this.dashboardRepository.getStats();
            res.json(dados);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DashboardController;