# Jira coding-agent setup

**Work item:** MYKIT-4  
**Validation work item:** MYKIT-5  
**Status:** Draft implementation runbook; administrator verification and an end-to-end Jira-native test are still required.  
**Documentation reviewed:** 2026-09-29

This document prepares a controlled coding-agent connection for `jarntz625/mykit-kidney-insights-tool`. It is not evidence that an app has been installed, permissions have been restricted, or a Jira-native agent run has succeeded. It does not approve a clinical release or replace the project's governance work.

## Keep the connections separate

A coding assistant reading Jira through Atlassian MCP and proposing a GitHub pull request is a different path from Jira starting a hosted coding-agent session. Success in the first path does not prove that Jira's repository connection, agent entitlement, or automated delegation is working.

The initial candidate is **Jira Coding Agent**, rather than introducing another provider during setup. Atlassian documents support for GitHub Cloud and Bitbucket Cloud, along with requirements for enabled Jira AI features, an eligible plan, available Rovo credits, and repository access. Confirm the current requirements in [Generate code from a work item](https://support.atlassian.com/jira-software-cloud/docs/generate-code-from-a-work-item-in-jira/) and [Supported repositories](https://support.atlassian.com/jira-software-cloud/docs/supported-repositories-for-jira-coding-agent/).

## Administrator checks

Record sanitized evidence in Jira, not credentials or account screenshots in this repository.

- [ ] Verify Jira AI features, plan eligibility, and available Rovo credits for the target site and space.
- [ ] Confirm the initiating user's GitHub identity has read/write access to this repository.
- [ ] Inspect the existing **GitHub for Atlassian** connection before installing or reconnecting anything. This is distinct from GitHub Copilot for Jira and from a coding assistant's own GitHub connection.
- [ ] Review any pending app-permission changes with the repository owner. Do not accept additional permissions automatically.
- [ ] Configure the relevant installation to **Only select repositories**, selecting this repository only. Verify the installed scope; a prompt naming one repository is not an access restriction.
- [ ] Confirm that this exact repository is available to Jira Coding Agent and that the necessary sync and user authorization have completed.
- [ ] Preserve the repository's existing ownership and visibility. If a setup flow requires an organization, resolve that with the owner; do not transfer the repository or broaden access as a workaround.

Follow [Connect GitHub to Teamwork Graph](https://support.atlassian.com/organization-administration/docs/connect-github-to-teamwork-graph/) for app permissions, connection status, and repository selection. Administrator approval is still required wherever the provider requests it.

## Investigate a failed session before retrying

Open the failed session from the Jira work item. Record its timestamp, session identifier, agent name, selected repository, and sanitized error text in Jira. A `FAILED` or `NEEDS_INPUT` state alone does not establish the cause.

Check the failure against entitlement/credits, user authorization, repository selection, accepted app permissions, and sandbox initialization. Do not copy tokens, authorization headers, private workbook exports, patient data, or signed download URLs into tickets or this repository. Do not repeatedly retry without a specific change to test.

## Configure the controlled test

Use **MYKIT-5** for the existing delegation test; MYKIT-4 remains the setup record.

In MYKIT-5, open **Agent sessions**, choose **Start work**, and select **Jira Coding Agent**. Select only `jarntz625/mykit-kidney-insights-tool`. Configure a new branch such as `MYKIT-5-agent-readme-test`, target `main`, and enable creation of a **draft** pull request. Review [session configuration](https://support.atlassian.com/jira-software-cloud/docs/configure-a-jira-coding-agent-session/) before starting.

Use this bounded test prompt:

```text
Implement the MYKIT-5 delegation test in jarntz625/mykit-kidney-insights-tool.

Change README.md only. Add a section titled "AI Agent Test" with this sentence:
"This documentation change was created as part of a Jira-to-coding-agent delegation test."

If that section already exists, do not duplicate it; report the existing evidence.
Create a new MYKIT-5-prefixed branch from main and open a draft pull request.
Include MYKIT-5 in the commit message and PR title.
Post the PR URL, commit SHA, and verification results to MYKIT-5.
Do not modify application code, configuration, dependencies, workflows, or clinical content.
Do not use patient data, credentials, secrets, or unrelated repositories.
Do not merge, deploy, enable auto-merge, or mark the work item Done.
Stop and report the exact sanitized blocker if authorization or repository access fails.
```

## Acceptance evidence

MYKIT-4 is ready for completion only after the owner reviews evidence that:

1. The intended Jira-native agent starts against the authorized repository.
2. The test produces a draft PR from a new branch, with `README.md` as the only changed file and the expected text present once.
3. The branch, commit, and PR carry MYKIT-5, and the PR is visible in Jira's development integration, not merely pasted into a comment.
4. Jira receives the PR link and an accurate result; failures remain failures rather than being marked complete.
5. Repository scope has been independently checked. No unrelated repository contents are accessed during validation.
6. No merge, release, production configuration change, or sensitive-data exposure occurs.

For this README-only test, inspect the complete diff and filename list. Record application build/UI tests as **not run**, unless they were actually executed. A documentation-only PR does not establish application correctness or clinical validation.

Keep automatic delegation disabled or unchanged until this manual test passes. Review any board-transition triggers before changing statuses: moving a card may itself start an agent. A human reviewer decides whether to merge or close the test PR. Closing the unmerged draft leaves `main` unchanged.
