import { test, expect } from '@playwright/test'
import { loginWith, createNote } from './helper'

test.describe('Note app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2025'
      )
    ).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith({page: page, username: 'mluukkai', password: 'wrong'})
    await expect(page.getByText('wrong credentials')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith({page: page, username: 'mluukkai', password: 'salainen'})

    await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith({page: page, username: 'mluukkai', password: 'salainen'})
    })

    test('a new note can be created', async ({ page }) => {
      await createNote({page, content: 'a note created by playwright'})
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    test.describe('and a note exists', () => {
      test.beforeEach(async ({ page }) => {
        await createNote({page, content: 'another note by playwright'})
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })

    test.describe('and several notes exists', () => {
      test.beforeEach(async ({ page }) => {
        await createNote({page, content: 'first note'})
        await createNote({page, content: 'second note'})
        await createNote({page, content: 'third note'})
      })

    test('one of those can be made nonimportant', async ({ page }) => {
      await page.pause()
      const otherNoteText = page.getByText('first note')
      const otherNoteElement = otherNoteText.locator('..')

      await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
      await expect(otherNoteElement.getByText('make important')).toBeVisible()
    })


    })
  })
})