import { generateMarkDown, getGitDiff, loadChangelogConfig, parseCommits } from 'changelogen'

export async function generateChangelog (cwd: string, from: string, newVersion: string) {
  const config = await loadChangelogConfig(cwd, {
    from,
    newVersion,
  })

  const rawCommits = await getGitDiff(config.from, config.to)

  console.log('From:', config.from, 'To:', config.to, 'Raw commits:', rawCommits)

  // Parse commits as conventional commits
  const commits = parseCommits(rawCommits, config).filter(
    (c) =>
      config.types[c.type] &&
      !(c.type === 'chore' && c.scope === 'deps' && !c.isBreaking)
  )

  console.log('Parsed commits:', commits)

  // Generate markdown
  return await generateMarkDown(commits, config)
}
