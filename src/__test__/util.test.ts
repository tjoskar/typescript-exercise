import { padLeft } from '../util'

describe('Pad left', () => {
  test('Left pad 5 speces', () => {
    const result = padLeft('hej', 5)

    expect(result).toBe('     hej')
  })

  test(`Left pad 'katt'`, () => {
    const result = padLeft('hej', 'katt')

    expect(result).toBe('katthej')
  })
})
