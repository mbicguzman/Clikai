SELECT --TOP 5
     RTRIM([x].[Folder Name])      AS [Folder_Name]
   , RTRIM([x].[Collateral Code])  AS [Collateral_Code]
   , RTRIM([x].[loan Number])      AS [loan_Number]
   , [x].[Loan Kind]               AS [Loan_Kind]
   , [x].[Property Type]           AS [Property_Type]
   , [x].[FacilityCode]            AS [FacilityCode]
FROM (
       SELECT
                   CASE
                     WHEN [p].[PROP_TYPE] LIKE '%HC%'
                       THEN
                       CONCAT (RTRIM ([p].[PROPERTY]), ' ', '#', [l].[LOAN])
                     WHEN [p].[PROP_TYPE] LIKE '%MF%'
                       THEN
                       CONCAT (RTRIM ([l].[LOAN_NAME]), ' ', '#', [l].[LOAN])
                   END                         AS [Folder Name]
                 , [p].[PROP_CODE]             AS [Collateral Code]
                 , [l].[LOAN]                  AS [loan Number]
                 , [vlk].[LoanKindDescription] AS [Loan Kind]
                 , LEFT([p].[PROP_TYPE], 2)    AS [Property Type]
                 , [udf].[FacilityCode]
       FROM
                   [dbo].[LOANMAST]               AS [l]
         LEFT JOIN [dbo].[LOANCOLL]               AS [l2]
           ON [l].[LOAN]         = [l2].[LOAN]
         LEFT JOIN [dbo].[PROPERTY]               AS [p]
           ON [l2].[CODE]        = [p].[PROP_CODE]
         LEFT JOIN [Report].[vwLoanKind]          AS [vlk]
           ON [vlk].[LoanNumber] = [l].[LOAN]
         LEFT JOIN [Report].[vwUserDefinedFields] AS [udf]
           ON [udf].[LoanNumber] = [l].[LOAN]
       WHERE
                   [l].[SYSTEM_STATUS]       = 'ACTIVE'
                   AND [l2].[RELEASE_DATE] IS NULL
                   AND (
                         [vlk].[LoanKindDescription] IN
                         ( 'HUD', 'Fannie Mae', 'Freddie Mac', 'MBI' )
                         AND [l2].[PRIM_IND] = 'Y'
                       )
 
       UNION
 
       SELECT
                   CASE
                     WHEN [p].[PROP_TYPE] LIKE '%HC%'
                       THEN
                       CONCAT (RTRIM ([p].[PROPERTY]), ' ', '#', [l].[LOAN])
                     WHEN [p].[PROP_TYPE] LIKE '%MF%'
                       THEN
                       CONCAT (RTRIM ([l].[LOAN_NAME]), ' ', '#', [l].[LOAN])
                   END                         AS [Folder Name]
                 , [p].[PROP_CODE]             AS [Collateral Code]
                 , [l].[LOAN]                  AS [loan Number]
                 , [vlk].[LoanKindDescription] AS [Loan Kind]
                 , LEFT([p].[PROP_TYPE], 2)    AS [Property Type]
                 , [udf].[FacilityCode]
       FROM
                   [dbo].[LOANMAST]               AS [l]
         LEFT JOIN [dbo].[LOANCOLL]               AS [l2]
           ON [l].[LOAN]         = [l2].[LOAN]
         LEFT JOIN [dbo].[PROPERTY]               AS [p]
           ON [l2].[CODE]        = [p].[PROP_CODE]
         LEFT JOIN [Report].[vwLoanKind]          AS [vlk]
           ON [vlk].[LoanNumber] = [l].[LOAN]
         LEFT JOIN [Report].[vwUserDefinedFields] AS [udf]
           ON [udf].[LoanNumber] = [l].[LOAN]
       WHERE
                   [l].[SYSTEM_STATUS] = 'ACTIVE'
                   AND [l2].[RELEASE_DATE] IS NULL
                   AND (
                         [vlk].[LoanKindDescription] IN ( 'RHS' )
                         OR [p].[PROP_TYPE] LIKE '%HC%'
                       )
     ) AS [x]
WHERE
     [x].[Property Type] IS NOT NULL
     AND [x].[Property Type] IN ( 'MF', 'HC' )
     AND (
           [x].[FacilityCode]    = 'FACILITY_A'
           OR [x].[FacilityCode] IS NULL
           OR [x].[FacilityCode] = ''
         )
     and [x].[loan Number] IN ('300123','300124','300125','300126','300127','300128','300129','300130')
ORDER BY
     [x].[loan Number] ;