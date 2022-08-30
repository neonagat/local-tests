import ProfilePage from '../pages/app/profile.page'

describe('Profile', () => {
  beforeEach(() => {
    cy.login(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
    cy.intercept(
      'GET',
      '/course/coursesProgress/*',
      {
        statusCode: 200,
        body: {
          "message": "Get courses progress",
          "success": true,
          "fail": false,
          "payload": [
            {
              "_id": "5ff4976d89f2b2003a2bf0a0",
              "completedLessons": 20,
              "totalLessons": 41,
              "course": {
                "_id": "5ff2005cacc2d5003ae26bc7",
                "name": "QA Manual"
              }
            }
          ]
        }
      }
    )
    cy.visit(`/profile/${Cypress.env('USER_ID')}`)
  })

  it.skip('Daily report creation', () => {
    const timestamp = new Date().getTime()
    const description = `${timestamp} 123456789012345678901234567890`
    cy.get('[data-qa="dailyReportsBtn"]')
      .click()
    cy.get('input[value="help_classmates"]')
      .click()
    cy.get('[id="labels.help_classmates.hours"]')
      .type('1')
    cy.get('#morale')
      .click()
    cy.get('.ant-select-item[title="5"]')
      .click()
    cy.get('textarea.ant-input')
      .type(description)
    cy.get('[type="submit"]')
      .click()

    cy.xpath(`//div[@class="ant-row mb-4"][contains(text(), "${timestamp}")]`)
      .should('be.visible')
  })

  it('Courses in progress', () => {
    ProfilePage.headerCoursesProgress.should('be.visible')
    ProfilePage.courseProgress.should('have.text', '49%')
  })
})
