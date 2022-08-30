import AppPage from './app.page'

class ProfilePage extends AppPage {
  get iconAvatar() { return cy.get('.ant-avatar-square') }
  get headerCoursesProgress() { return cy.xpath('//h5[.="Course progress"]') }
  get courseProgress() { return cy.get('.ant-progress-text') }
}

export default new ProfilePage()
