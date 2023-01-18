export const idlFactory = ({ IDL }) => {
  const Result_3 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  const User = IDL.Record({
    githubTime: IDL.Opt(IDL.Int),
    twitter: IDL.Opt(IDL.Text),
    twitterTime: IDL.Opt(IDL.Int),
    user: IDL.Principal,
    discordTime: IDL.Opt(IDL.Int),
    account: IDL.Text,
    discord: IDL.Opt(IDL.Text),
    principalId: IDL.Text,
    github: IDL.Opt(IDL.Text),
  });
  const Result_1 = IDL.Variant({ ok: IDL.Vec(User), err: IDL.Text });
  const Result_2 = IDL.Variant({ ok: User, err: IDL.Text });
  const VerifyType = IDL.Variant({
    twitter: IDL.Null,
    discord: IDL.Null,
    github: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Bool, err: IDL.Text });
  return IDL.Service({
    cycleAvailable: IDL.Func([], [Result_3], []),
    cycleBalance: IDL.Func([], [Result_3], ["query"]),
    find: IDL.Func([IDL.Nat], [Result_1], ["query"]),
    get: IDL.Func([], [Result_2], ["query"]),
    searchDiscordAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    searchGithubAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    searchIcpAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    searchMultiTwitterAccount: IDL.Func(
      [IDL.Vec(IDL.Text)],
      [Result_1],
      ["query"]
    ),
    searchTwitterAccount: IDL.Func([IDL.Text], [Result_1], ["query"]),
    verify: IDL.Func([VerifyType, IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
