import { initials, colorFor } from './avatar'

describe('initials', () => {
  it('takes the first two letters of a single-word name', () => {
    expect(initials('general')).toBe('GE')
  })

  it('takes the first letter of the first and last word for multi-word names', () => {
    expect(initials('Marketing Team')).toBe('MT')
  })

  it('ignores extra whitespace between words', () => {
    expect(initials('  Marketing   Team  ')).toBe('MT')
  })
})

describe('colorFor', () => {
  it('returns the same color for the same input every time', () => {
    expect(colorFor('general')).toBe(colorFor('general'))
  })

  it('returns a valid oklch color string', () => {
    expect(colorFor('general')).toMatch(/^oklch\(/)
  })

  it('can return different colors for different inputs', () => {
    const colors = new Set(['general', 'random', 'marketing', 'design', 'engineering'].map(colorFor))
    expect(colors.size).toBeGreaterThan(1)
  })
})
