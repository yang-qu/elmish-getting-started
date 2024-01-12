module Deferred.Types

type Deferred<'t> =
    | HasNotStartedYet
    | InProgress
    | Resolved of 't
